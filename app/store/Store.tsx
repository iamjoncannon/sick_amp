import React from 'react';
import * as Types from './Types'

const initialState : Types.Store = {
    Transport : {
        current: 1, 
    },
    isPlaying: false,
    SelectedPlaylist: "All",
    RunningPlaylist: "All",
    Columns: null,
    PlayLists: null,
    Songs: null,
    draggedOverPlaylist: null,
    token: "dev"
};

interface ReduxAction {
    type: string
    // ideally this would be an enum 
    // with the contract for every action
    payload: any 
}

function reducer(state : Types.Store, action : ReduxAction ) {

    console.log("Action: ", action.type, action.payload)

    switch (action.type) {

        case 'HYDRATE_PLAYLISTS': {

            return {...state, PlayLists: action.payload}
        }

        case 'HYDRATE_SONGS': {

            const { PlayList, Page, data } = action.payload

            // pouring songs into the pool

            const Songs = {...state.Songs, ...data}

            // update the hydration hash for the playlist 

            const PlayLists = {...state.PlayLists}

            PlayLists[PlayList].hydrated[Page] = true 
  
            return {...state, PlayLists : PlayLists, Songs: Songs }
        }

        case 'PLAYLIST_END': {

            const { PlayList, Page } = action.payload

            const next_PlayLists = {...state.PlayLists}

            next_PlayLists[PlayList].hydrated["Complete"] = true 
            next_PlayLists[PlayList].hydrated[Page] = true 

            return {...state, PlayLists: next_PlayLists }
        }

        case 'HYDRATE_COLUMNS': {

            return {...state, Columns: action.payload.data}
        }
        

        case 'SELECT_PLAYLIST':
        
            return { ...state, SelectedPlaylist: action.payload }

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

            // if its playing from the all playlist, then its simply the previous track
            // or the end of the playlist if current = 0 

            let next_current 

            if(RunningPlaylist === "All"){

                next_current = current === 0 ? PlayLists[RunningPlaylist].length -1 : Number(current) - 1 
            }
            else{

                // if its a specific playlist, then we need to find the index of the track in the 
                // playlists ids and return the previous index, or end if 0 

                let CurrentPlaylist = PlayLists[RunningPlaylist].ids

                const current_index = CurrentPlaylist.indexOf(current)

                next_current = current_index === 0 ? CurrentPlaylist[CurrentPlaylist.length -1] : CurrentPlaylist[current_index -1 ] 
            
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

                next_current = current === CurrentPlaylist.length -1 ? 0 : Number(current) + 1 
            }
            else{

                CurrentPlaylist = PlayLists[RunningPlaylist].ids

                const current_index = CurrentPlaylist.indexOf(current)

                next_current = current_index === CurrentPlaylist.length -1 ? CurrentPlaylist[0] : CurrentPlaylist[current_index + 1 ] 
            }

            let newTransport : Types.Transport = { current: next_current } 
            
            return {...state, Transport: newTransport, isPlaying: true}
        }

        case 'ADD_SONG_TO_PLAYLIST':{

            const { PlayLists } = state 
            const { payload: { song, playlist } } = action

            const nextPlaylists = [...PlayLists]

            if(!nextPlaylists[playlist].ids.includes(Number(song))){

                nextPlaylists[playlist].ids = [...PlayLists[playlist].ids, Number(song)]
            }

            return {...state, PlayLists : nextPlaylists, draggedOverPlaylist: null}
        }

        case "TOGGLE_PLAYERSTATE": {

            return {...state, isPlaying: !state.isPlaying}
        }


        case "REARRANGE_PLAYLIST": {

            const { item_to_put_before, item_to_be_moved } = action.payload

            let next_playlist_object = [...state.PlayLists]
            
            if(state.SelectedPlaylist !== "All"){

                let targetPlaylist = next_playlist_object[state.SelectedPlaylist].ids

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

                next_playlist_object[state.SelectedPlaylist].ids = nextTargetPlaylist
                
            }
            
            // this could be refactored- playlists is an object
            // we also want to treat like an array - "All" needs
            // to be reappended if we destructure as above 
                
            next_playlist_object["All"] = [...Object.values(state.Songs)]
                        
            return {...state, PlayLists : next_playlist_object}
        }

        case "ADD_PLAYLIST":{

            let next_playlist_object = {...state.PlayLists}

            next_playlist_object[next_playlist_object.length] = { name: "New PlayList", id: next_playlist_object.length, files: [ ]}

            return {...state, PlayLists : next_playlist_object}
        }

        case "DRAG_OVER_PLAYLIST": {

            return {...state, draggedOverPlaylist: action.payload}
        }
        
        default:
          return state;
      }
}

export const Store = React.createContext(null);

export function StoreProvider(props : any) {

    const [state, dispatch] = React.useReducer(reducer, initialState);
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