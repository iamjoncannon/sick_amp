import React from 'react'
import { mount } from 'enzyme'
// import ComponentToTest from './ComponentToTest'
import Types from '../store/Types'

/*

    Intended behavior: 

    [ ] 

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

describe("ComponentToTest", ()=>{

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {

        MockStore = React.createContext(null);

        mockInitialState = {

            // store to mock
            
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

               {/* 

                <ComponentToTest target={prop}/>

               */}

            </MockStoreProvider>
            );
    }

    it('Component renders correctly', () => {

        // const Tree = TestComponent("all_fields")
        
        // expect(Tree).toMatchSnapshot();

        expect(true).toEqual(true)
    });

    

})
