import React from 'react';
import * as Types from './Types'

const initialState : Types.Store = {
    SelectedPlaylist: 1, // defaults to "All"
    ColumnHash: null,
    PlayLists: null,
    Songs: null,
};

interface ReduxAction {
    type: string
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
        
        case 'ADD_SONG_TO_PLAYLIST':

            return {...state}
        
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
