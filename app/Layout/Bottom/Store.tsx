import React from 'react';
import * as Types from './Types'

const initialState : Types.Store = {
    isHydrated : false,
    SelectedPlaylist: 1,
    PlayLists: null,
    Songs: null,
};

interface ReduxAction {
    type: string
    payload: string
}

function reducer(state : Types.Store, action : ReduxAction ) {

    switch (action.type) {

        case 'HYDRATE': {

            return {...state, Songs: action.payload, isHydrated : true }
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
