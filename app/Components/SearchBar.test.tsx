import React from 'react'
import { mount } from 'enzyme'
import SearchBar from './SearchBar'
import Types from '../store/Types'
import {TOGGLE_SEARCHBAR_FOCUS, HANDLE_SEARCHBAR_TEXT} from '../store/Store'

/*

    Intended behavior: 

    [x] renders an icon if the text is empty

    [x] onFocus and blur, dispatches a toggle search bar to global state 

    [x] appends its value to global state at SearchBarText[target].text

    [x] inline styling changes based on which field is getting rendered

*/

export let MockStore 
let mockState 
let dispatchedActions = []
let mockInitialState

function mockReducer(state : Types.Store, action : ReduxAction ) {
    
    switch (action.type) {

        case "TOGGLE_SEARCHBAR_FOCUS": {

            return TOGGLE_SEARCHBAR_FOCUS(state, action)
        }

        case "HANDLE_SEARCHBAR_TEXT" : {

            return HANDLE_SEARCHBAR_TEXT(state, action)
        }
    }
}

describe("SearchBar", ()=>{

    beforeEach(() => {

        MockStore = React.createContext(null);

        mockInitialState = {

            isTypingInSearchBar: true,
            SearchBarText: {
              '1': { field: 'artist', text: '' },
              '2': { field: 'album_artist', text: '' },
              '3': { field: 'genre', text: '' },
              all_fields: { text: '' }
            }
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
                <SearchBar target={prop}/>
            </MockStoreProvider>
            );
    }

    it('SearchBar renders correctly with a target prop', () => {

        const Tree = TestComponent("all_fields")
        
        expect(Tree).toMatchSnapshot();
    });

    it('onFocus and blur dispatches TOGGLE_SEARCHBAR_FOCUS action to global state', ()=>{

        const Tree = TestComponent("all_fields")
        
        const input = Tree.find('input')

        input.simulate("focus")

        expect(dispatchedActions[0].type).toEqual("TOGGLE_SEARCHBAR_FOCUS")
        expect(dispatchedActions[0].payload).toEqual(true)
    
        input.simulate("blur")

        expect(dispatchedActions[1].type).toEqual("TOGGLE_SEARCHBAR_FOCUS")
        expect(dispatchedActions[1].payload).toEqual(false)
    })

    it('SearchBar only renders the svg icon if the text field is empty', ()=>{

        const Tree = TestComponent("all_fields")
        
        expect(Tree.find("svg").length).toEqual(1)

        mockInitialState.SearchBarText.all_fields.text = "This is test input"

        const Tree2 = TestComponent("all_fields")
            
        expect(Tree2.find("svg").length).toEqual(0)
    })

    it("onChange callback calls HANDLE_SEARCHBAR_TEXT and appends its value to global state at SearchBarText[target].text", ()=>{

        dispatchedActions = []

        const Tree = TestComponent("all_fields")
        
        let input = Tree.find('input')

        const testText = "This is my test text"

        input.simulate("change", {target: {value: testText}})

        expect(mockInitialState.SearchBarText.all_fields.text).toEqual(testText)
        expect(dispatchedActions[0].type).toEqual("HANDLE_SEARCHBAR_TEXT")
        expect(dispatchedActions[0].payload.text).toEqual(testText)

        const Tree2 = TestComponent('1')
        
        input = Tree2.find('input')

        input.simulate("change", {target: {value: testText}})

        expect(mockInitialState.SearchBarText['1'].text).toEqual(testText)
        expect(dispatchedActions[1].type).toEqual("HANDLE_SEARCHBAR_TEXT")
        expect(dispatchedActions[1].payload.text).toEqual(testText)
    })

    it("inline styling changes based on which field is selected", ()=>{

        const Tree = TestComponent("all_fields")

        let input = Tree.find('input')

        expect(input.props().style.width).toEqual('20vw')
        expect(input.props().style.height).toEqual('4vh')

        const Tree2 = TestComponent('1')
        
        input = Tree2.find('input')

        expect(input.props().style.width).toEqual('10vw')
        expect(input.props().style.height).toEqual('2vh')
    })

})
