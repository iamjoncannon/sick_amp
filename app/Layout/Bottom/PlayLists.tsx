import React from 'react';
const useEffect = (React as any).useEffect;
import { Store } from '../../store/Store'
import { fetchInitialData } from '../../store/Thunks'
import { postPlayList } from '../../store/Thunks'
import styled from 'styled-components'
import axios from 'axios'
import { sortColumns } from './Helpers'
import * as Types from '../../store/Types'
import PlayList from './PlayList'
import EditablePlayList from './EditablePlayList'

const PlayListsContainer = styled.div`
 
    font-size: 1.75vh;
    cursor: default;
    height: 89.5vh;
    width: 14vw;
    background-image: ${props=>props.theme.primaryColor};
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 1rem;

    button {
        height: 1vh;
    }

    #selected {
        font-weight: bold;
        text-decoration: underline;
    }

    #draggedOver {

        border: 2px solid black; 
    }
`

const PlayListHeader = styled.span`
    text-decoration: underline;
    margin-top: 2vh;
`

const PlayLists = () => {
    
    const { state, dispatch } = React.useContext(Store);
    const [ isLoading, handleLoading ] = React.useState(false)

    React.useEffect( ()=>{

        if(state.PlayLists === null){

            handleLoading(true)

            if(!isLoading){

                fetchInitialData(state.token, dispatch)
            }
        }
    })

    const addPlaylist = () => {
        
        dispatch({type: "START_EDITING_PLAYLIST", payload : "post"})    
    }

    return (

        <PlayListsContainer>
            
            {
                !!state.PlayLists &&
                <>

                    <PlayList key={"All"} id={"All"} /> 

                    <PlayListHeader>
                        Playlists 
                        <button onClick={addPlaylist}>+</button> 
                    </PlayListHeader>
                    
                    {Object.values(state.PlayLists)
                        .filter(each=> each.name !== "All Songs")
                        .map( (each : Types.PlayList) =>{
                            
                            return (
                                <PlayList key={each.id} id={each.id} /> 
                                )
                        })}
                    {state.isEditingNewPlayList === "post" && 
                                 <EditablePlayList 
                                    new
                                    initialValue={"New PlayList"}
                                  /> }
                </>
            }

        </PlayListsContainer>
    )
}

export default PlayLists