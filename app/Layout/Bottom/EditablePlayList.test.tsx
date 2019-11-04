import React from 'react'
import { mount } from 'enzyme'
import EditablePlayList from './EditablePlayList'
import Types from '../store/Types'
import { act } from 'react-dom/test-utils';
import moxios from 'moxios'

/*

    Intended behavior: 

    [x] props.initialState used in initial useState value
    [x] onChange sets local state with key value
    [x] onKeyPress monitors keys, if "Enter", dispatches postPlayList or putPlayList thunk to api 
    [ TODO ] if not a new playlist, calls playlist put route to api 
    [x] onMouseLeave dispatches CANCEL_UPDATE_PLAYLISTS to store 
*/

export let MockStore 
let dispatchedActions = []
let mockInitialState

function mockReducer(state : Types.Store, action : ReduxAction ) {
    
    switch (action.type) {

    }
}

describe("EditablePlayList", ()=>{
    let nextState = [] 
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        moxios.install()
        MockStore = React.createContext(null);

        mockInitialState = {

            token: "dev"
        }
    });

    afterEach(()=>{

        moxios.uninstall()
    })

    function MockStoreProvider(props : any) {

        let [ state, dispatch ] = React.useReducer(mockReducer, mockInitialState);

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

    function TestComponent (prop, isNew){

        if(isNew){

            return mount(
                <MockStoreProvider>
                    <EditablePlayList new initialValue={prop}/>
                </MockStoreProvider>
                );
        }

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

    it("onKeyPress monitors keys, if 'Enter', calls playlist thunk", async (done)=>{

        const initialProps = "Im the InitialValue Prop"
        const Tree = TestComponent(initialProps, true)

        act(()=>{

            Tree.find('input').props().onKeyPress({key: 'space'})
        })

        moxios.wait(()=>{

            expect(moxios.requests.__items.length).toEqual(0)
            
            act(()=>{

                const newPlaylist = "New PlayList Name"
                
                Tree.find('input').props().onKeyPress({key: 'Enter', target: {value: newPlaylist}})
                
                moxios.wait(()=>{

                    expect(moxios.requests.mostRecent().url).toEqual('http://localhost:3030/folders/?api_key=dev')
                    expect(moxios.requests.mostRecent().config.data).toEqual(JSON.stringify({name: newPlaylist}))
                    done()
                })
            })
        })
    })

    it("onMouseLeave dispatches CANCEL_UPDATE_PLAYLISTS to store", ()=>{

        const initialProps = "Im the InitialValue Prop"
        const Tree = TestComponent(initialProps, true)

        act(()=>{

            Tree.find('input').props().onMouseLeave()
        })

        expect(dispatchedActions[0].type).toEqual('CANCEL_UPDATE_PLAYLISTS')
    })
})
