import React from 'react';
import * as Types from './Types'

export const initialState : Types.Store = {

    Transport : {  current: 1 },
    isPlaying: false,
    
    PlayLists: null,
    SelectedPlaylist: "All",
    RunningPlaylist: "All",
    draggedOverPlaylist: null,
    isEditingNewPlayList: false,
    
    Columns: null,
    
    Songs: null,
    
    isTypingInSearchBar: false,
    SearchBarText: {
        all_fields: { text: ""},
        1: {field: "artist", text: ""},
        2: {field: "album_artist", text: ""},
        3: {field: "genre", text: ""}
    },
    FilterState: {
        bpm: [50, 200]
        // artist : { }
        // artist_album : { } 
        // genre :  { }
    },
    token: "dev"
};

export function MUTATE_FILTERSTATE(state, action){

    const { payload: { field, value } } = action 
    const { FilterState } = state 
    const new_FilterState = {...FilterState}

    if(!new_FilterState[field]) new_FilterState[field] = {}

    if(new_FilterState[field][value]){
        
        delete new_FilterState[field][value]
    }
    else if(field === "bpm"){

        new_FilterState["bpm"] = value
    }
    else{

        // only one key to be filtered
        
        if(field === "key") new_FilterState.key = {}

        // to do - place harmonic logic here to append 
        // harmonics to state for downstream component 
        
        new_FilterState[field][value] = true 
    }

    return {...state, FilterState : new_FilterState }
}

export function TOGGLE_SEARCHBAR_FOCUS(state, action){

    return {...state, isTypingInSearchBar: action.payload}
}

export function HANDLE_SEARCHBAR_TEXT(state, action){

    const { target, text } = action.payload
    const next_SearchBar_text_object = {...state.SearchBarText}

    next_SearchBar_text_object[target]["text"] = text 

    return {...state, SearchBarText: next_SearchBar_text_object }
}

export function CANCEL_UPDATE_PLAYLISTS(state,action){

    return {...state, isEditingNewPlayList: false}
}

interface ReduxAction {
    type: string
    payload: any 
}

export function reducer(state : Types.Store, action : ReduxAction ) {

    process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && console.log("Action: ", action.type, action.payload)

    switch (action.type) {

        /*

            COLUMNS

        */

       case 'HYDRATE_COLUMNS': {

            return {...state, Columns: action.payload.data}
       }   


       /*

            TRANSPORT
       */


      case "TOGGLE_PLAYERSTATE": {

            return {...state, isPlaying: !state.isPlaying}
      }

        /*

            SONGS 

        */

       case 'HYDRATE_SONGS': {

           const { PlayList, Page, data } = action.payload

           // pouring songs into the pool

           const Songs = {...state.Songs, ...data}

           // update the hydration hash for the playlist 

           const PlayLists = {...state.PlayLists}

           PlayLists[PlayList].hydrated[Page] = true 
 
           return {...state, PlayLists : PlayLists, Songs: Songs }
       }

       case 'PLAY_TRACK': {

            const current : number = Number(action.payload)

            const { SelectedPlaylist } = state 

            let newTransport : Types.Transport = { current } 

            return {...state, Transport: newTransport, isPlaying: true, RunningPlaylist: SelectedPlaylist}
        }

        case "PLAY_PREVIOUS_TRACK": {

            const { RunningPlaylist, PlayLists, Transport : { current } } = state 

            // architecture note- I decided to structure the "All" Playlist and the specific
            // playlists differently- see ./Types -- this requires us to handle each differently
            // in the playlist actions - this could certainly be revisited and refactored 

            let next_current 

            if(RunningPlaylist === "All"){

                next_current = current === 1 ? Object.keys(state.Songs).length : Number(current) - 1 
            }
            else{

                if(PlayLists[RunningPlaylist].files.length === 1) return {...state}

                // if its a specific playlist, then we need to find the index of the track in the 
                // playlists files and return the previous index, or end if 0 

                let CurrentPlaylist = PlayLists[RunningPlaylist].files

                const current_index = CurrentPlaylist.indexOf(current)

                next_current = current_index === 1 ? CurrentPlaylist[CurrentPlaylist.length] : CurrentPlaylist[current_index -1 ] 
            
            }

            let newTransport : Types.Transport = { current: next_current } 
            
            return {...state, Transport: newTransport, isPlaying: true}
        }

        case "PLAY_NEXT_TRACK": {

            const { RunningPlaylist, PlayLists, Transport : { current } } = state 

            let next_current 
            let CurrentPlaylist 


            if(RunningPlaylist === "All"){

                CurrentPlaylist = PlayLists[RunningPlaylist]

                next_current = current === Object.keys(state.Songs).length ? 1 : Number(current) + 1 
            }
            else{

                if(PlayLists[RunningPlaylist].files.length === 1) return {...state}

                CurrentPlaylist = PlayLists[RunningPlaylist].files

                const current_index = CurrentPlaylist.indexOf(current)

                next_current = current_index === CurrentPlaylist.length ? CurrentPlaylist[1] : CurrentPlaylist[current_index + 1 ] 
            }

            let newTransport : Types.Transport = { current: next_current } 
            
            return {...state, Transport: newTransport, isPlaying: true}
        }

        /*

            PLAYLISTS/FOLDERS

        */

        case 'HYDRATE_PLAYLISTS': {

            return {...state, PlayLists: action.payload}
        }

        case 'START_EDITING_PLAYLIST': {

            return {...state, isEditingNewPlayList: action.payload }
        }


        case 'PLAYLIST_END': {

            const { PlayList, Page } = action.payload

            const next_PlayLists = {...state.PlayLists}

            next_PlayLists[PlayList].hydrated["Complete"] = true 
            next_PlayLists[PlayList].hydrated[Page] = true 

            return {...state, PlayLists: next_PlayLists }
        }

    
        case 'SELECT_PLAYLIST':{
    
            return { ...state, Page: 1, SelectedPlaylist: action.payload }
        }
        
        case 'ADD_SONG_TO_PLAYLIST':{

            const { PlayLists, draggedOverPlaylist } = state 
            const { payload: { song } } = action

            const nextPlaylists = {...PlayLists}

            if(!nextPlaylists[draggedOverPlaylist].files.includes(Number(song))){

                nextPlaylists[draggedOverPlaylist].files = [...PlayLists[draggedOverPlaylist].files, Number(song)]
            }

            return {...state, PlayLists : nextPlaylists, draggedOverPlaylist: null}
        }

        case "REARRANGE_PLAYLIST": {

            const { item_to_put_before, item_to_be_moved } = action.payload

            let next_playlist_object = state.PlayLists
            
            if(state.SelectedPlaylist !== "All"){

                let targetPlaylist = next_playlist_object[state.SelectedPlaylist].files

                let nextTargetPlaylist = []

                // this is not the most clever way to do this
                // but it works 
                for(let i = 0; i < targetPlaylist.length; i++){

                    if(targetPlaylist[i] !== item_to_be_moved){
                        
                        if(targetPlaylist[i] === item_to_put_before){

                            nextTargetPlaylist.push(item_to_be_moved)
                        }

                        nextTargetPlaylist.push(targetPlaylist[i])
                    }
                }

                next_playlist_object[state.SelectedPlaylist].files = nextTargetPlaylist
            }
                                    
            return {...state, PlayLists : next_playlist_object}
            
        }

        case "UPDATE_PLAYLISTS":{

            const next_playlist_object = {...state.PlayLists}

            const { id } = action.payload 

            next_playlist_object[id] = action.payload

            next_playlist_object[id].hydrated = { }

            return {...state, isEditingNewPlayList: false, PlayLists : next_playlist_object}
        }
        
        case "CANCEL_UPDATE_PLAYLISTS":{

            return CANCEL_UPDATE_PLAYLISTS(state, action)
        }

        case "DRAG_OVER_PLAYLIST": {

            return {...state, draggedOverPlaylist: action.payload}
        }


        /*

            SEARCH

        */

        case "TOGGLE_SEARCHBAR_FOCUS": {

            return TOGGLE_SEARCHBAR_FOCUS(state, action)
        }

        case "HANDLE_SEARCHBAR_TEXT" : {

            return HANDLE_SEARCHBAR_TEXT(state, action)
        }

        case "MUTATE_FILTERSTATE": {

            return MUTATE_FILTERSTATE(state, action)
        }
        
        default:
          return state;
      }
}

export const Store = React.createContext(null);

export function StoreProvider(props : any) {

    const [ state, dispatch ] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    )
}

function clone(item){

    return JSON.parse(JSON.stringify(item))
}