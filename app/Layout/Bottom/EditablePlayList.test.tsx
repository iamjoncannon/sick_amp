import React from 'react'
import { mount } from 'enzyme'
import EditablePlayList from './EditablePlayList'
import Types from '../store/Types'
import nocked from '../../test/nock.setup'

/*

    Intended behavior: 

    [ ] props.initialState used in initial useState value
    [ ] onChange sets local state with key value
    [ ] onKeyPress monitors keys, if "Enter", dispatches postPlayList or putPlayList thunk to api 
    [ ] onFocus selects the input element
    [ ] onMouseLeave dispatches CANCEL_UPDATE_PLAYLISTS to store 
*/

export let MockStore 
let mockState 
let dispatchedActions = []
let mockInitialState

function mockReducer(state : Types.Store, action : ReduxAction ) {
    
    switch (action.type) {

        // actions to mock 
    }
}

describe("EditablePlayList", ()=>{

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {

        MockStore = React.createContext(null);

        mockInitialState = {

            token: "dev"
        }
    });

    function MockStoreProvider(props : any) {

        let [ state, dispatch ] = React.useReducer(mockReducer, mockInitialState);

        mockState = state 

        let mockDispatch = function(...args){

            dispatchedActions.push(...args)

            dispatch(...args)
        }

        return (
            <MockStore.Provider value={{ state, dispatch: mockDispatch }}>
                {props.children}
            </MockStore.Provider>
        )
    }

    function TestComponent (prop){

        return mount(
            <MockStoreProvider>
                <EditablePlayList initialValue={prop}/>
            </MockStoreProvider>
            );
    }

    it('Component renders correctly', () => {

        const Tree = TestComponent("Im the InitialValue Prop")
        
        expect(Tree).toMatchSnapshot();
    });

    it('props.initialState used in initial useState value', () => {

        const initialProps = "Im the InitialValue Prop"
        const Tree = TestComponent(initialProps)

        expect(Tree.find('input').props().value).toEqual(initialProps)
    });
    
    it("onChange callback sets local state with key value", ()=>{

        const initialProps = "Im the InitialValue Prop"
        const Tree = TestComponent(initialProps)

        Tree.find('input').props().onChange({key: "E"})
    
        expect(setState.mock.calls[0][0]).toEqual('E')
    })

    // [ ] onKeyPress monitors keys, if "Enter", dispatches postPlayList or putPlayList thunk to api 
    

    
    // [ ] onFocus selects the input element
    // [ ] onMouseLeave dispatches CANCEL_UPDATE_PLAYLISTS to store 
    

})
