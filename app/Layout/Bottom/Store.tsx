import React from 'react';
import * as Types from './Types'

const initialState : Types.Store = {
    Transport : {
        previous: null, 
        current: null, 
        next: null
    },
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

            const { Songs, PlayLists} = action.payload

            return {...state, 
                    Songs,
                    PlayLists,
                    ColumnHash: action.payload.ColumnHash
                    }
        }

        case 'SELECT_PLAYLIST':
        
            return { ...state, SelectedPlaylist: action.payload }

        case 'PLAY_TRACK': {




        }
        
        case 'ADD_SONG_TO_PLAYLIST':{

            const { PlayLists } = state 
            const { payload: { song, playlist } } = action

            const nextPlaylists = [...PlayLists]

            nextPlaylists[playlist].ids = [...PlayLists[playlist].ids, Number(song)]

            return {...state, PlayLists : nextPlaylists}
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
