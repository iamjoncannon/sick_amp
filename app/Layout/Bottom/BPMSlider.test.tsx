import React from 'react'
import { mount } from 'enzyme'
import BPMSlider, { SliderContainer } from './BPMSlider'
import Types from '../../store/Types'
import { MUTATE_FILTERSTATE } from '../../store/Store'
import { act } from 'react-dom/test-utils';

/*
    Intended behavior: 

    [x] displays BPM from FilterState in two spans 
    [x] onChange callback sets value property on local state
    [x] onAfterChange callback dispatches MUTATE_FILTERSTATE to store with local state

*/

export let MockStore 
let mockState 
let dispatchedActions = []
let mockInitialState

function mockReducer(state : Types.Store, action : ReduxAction ) {
    
    switch (action.type) {

        case "MUTATE_FILTERSTATE": {

            return MUTATE_FILTERSTATE(state, action)
        }
    }
}

describe("BPMSlider", ()=>{
    let nextState = [] 
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {

        MockStore = React.createContext(null);

        mockInitialState = {

              FilterState: {
                  bpm: [100, 200]
              }          
        }
    });

    function MockStoreProvider(props : any) {

        let [ state, dispatch ] = React.useReducer(mockReducer, mockInitialState);

        mockState = state 

        let mockDispatch = function(...args){

            dispatchedActions.push(...args)

            dispatch(...args)

            nextState.push(state)
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

                <BPMSlider />

            </MockStoreProvider>
            );
    }

    it('Component renders correctly', () => {

        const Tree = TestComponent()
        
        expect(Tree).toMatchSnapshot();
    });

    it("displays BPM from FilterState in two spans ", ()=>{

        const Tree = TestComponent()
        const spans = Tree.find('span')
        expect(spans.get(1).props.children).toEqual(mockInitialState.FilterState.bpm[0])
        expect(spans.get(2).props.children).toEqual(mockInitialState.FilterState.bpm[1])
    })
    
    it("onChange callback sets value property on local state", ()=>{

        const Tree = TestComponent()

        const Slider = Tree.find(SliderContainer).props().children[1]

        const newValue = [150,200]

        Slider.props.onChange(newValue)
        
        expect(setState.mock.calls[0][0]).toEqual(newValue)
    })

    it("onAfterChange callback dispatches MUTATE_FILTERSTATE to store with current value of input", ()=>{

        dispatchedActions = []

        const Tree = TestComponent()

        let Slider = Tree.find(SliderContainer).props().children[1]

        const { value } = Slider.props

        act(()=>{
            
            Slider.props.onAfterChange()
        })

        expect(dispatchedActions[0].type).toEqual("MUTATE_FILTERSTATE")
        expect(dispatchedActions[0].payload.value).toEqual(value)

        expect(nextState[0].FilterState.bpm).toEqual([100,200])
    })
})
