import React from 'react';
import * as Types from './Types'

const initialState : Types.Store = {
    Transport : {
        previous: null, 
        current: 0, 
        next: 1
    },
    isPlaying: false,
    SelectedPlaylist: "All",
    ColumnHash: null,
    PlayLists: null,
    Songs: null,
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

        case 'HYDRATE': {

            const { Songs, PlayLists, ColumnHash } = action.payload

            PlayLists.All = [...Object.values(Songs)]

            const Transport = { previous: Object.keys(Songs).length -1 , current: 0, next: 1}

            return {...state, 
                    Songs,
                    PlayLists,
                    ColumnHash,
                    Transport
                    }
        }

        case 'SELECT_PLAYLIST':
        
            return { ...state, SelectedPlaylist: action.payload }

        case 'PLAY_TRACK': {

            /*
                receives playlist id and song id 
                returns new transport object 
                
                edge cases - first or last song in 
                playlist, automatically loop to next 
            */

            const current : number = Number(action.payload)

            const CurrentPlaylist = state.PlayLists[state.SelectedPlaylist]

            let newTransport : Types.Transport = { current, previous: null, next: null } 

            newTransport.previous = current === 0 ? CurrentPlaylist[CurrentPlaylist.length - 1] : current - 1

            newTransport.next = current === CurrentPlaylist.length - 1 ? 0 : current + 1 

            return {...state, Transport: newTransport, isPlaying: true}

        }
        
        case 'ADD_SONG_TO_PLAYLIST':{

            const { PlayLists } = state 
            const { payload: { song, playlist } } = action

            const nextPlaylists = [...PlayLists]

            nextPlaylists[playlist].ids = [...PlayLists[playlist].ids, Number(song)]

            return {...state, PlayLists : nextPlaylists}
        }

        case "TOGGLE_PLAYERSTATE": {

            return {...state, isPlaying: !state.isPlaying}
        }

        case "PLAY_PREVIOUS_TRACK": {

            const CurrentPlaylist = state.PlayLists[state.SelectedPlaylist]
            
            // same thing as PLAY_TRACK, except we set current to previous before calculating
            // other values 
            
            let current = Number(state.Transport.previous) 
                        
            const previous = current === 0 ? CurrentPlaylist[CurrentPlaylist.length - 1] : current - 1
            
            const next = current === CurrentPlaylist.length - 1 ? 0 : current + 1 
            
            let newTransport : Types.Transport = { current, previous, next } 
            
            return {...state, Transport: newTransport, isPlaying: true}
        }

        case "PLAY_NEXT_TRACK": {

            const CurrentPlaylist = state.PlayLists[state.SelectedPlaylist]
            
            // same thing as PLAY_TRACK, except we set current to next before calculating
            // other values 
            
            let current = Number(state.Transport.next)
                        
            const previous = current === 0 ? CurrentPlaylist[CurrentPlaylist.length - 1] : current - 1
            
            const next = current === CurrentPlaylist.length - 1 ? 0 : current + 1 
            
            let newTransport : Types.Transport = { current, previous, next } 
            
            return {...state, Transport: newTransport, isPlaying: true}
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
            
            return {...state, PlayLists : next_playlist_object}
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
