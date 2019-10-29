import React from 'react';
const useEffect = (React as any).useEffect;
import { Store } from '../../store/Store'
import styled from 'styled-components'
import axios from 'axios'
import { sortColumns } from './Helpers'
import * as Types from '../../store/Types'
import PlayList from './PlayList'
import { remote_url } from '../../../config'

const PlayListsContainer = styled.div`
 
    font-size: 2vh;
    cursor: default;
    height: 90vh;
    width: 14vw;
    background-color: ${props=>props.theme.primaryColor};
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
        background-color: ${props=>props.theme.highlightColor};
        color: ${props=>props.theme.secondaryColor};
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

    React.useEffect( ()=>{

        async function fetchData(){

            let { data } = await axios.get(`${remote_url}/folders/?api_key=${state.token}`)
            
            const formattedData = {}
            
            for(let playlist in data){

                // add All playlist

                formattedData["All"] = { name: "All Songs" }
                
                // make sure the local hash key is the same 
                // as the id returned from the server
                formattedData[data[playlist].id] = data[playlist]
                
                // add hydrated boolean to prevent manage
                // fetching of data for each playlist 
                formattedData[data[playlist].id].hydrated = false
            }

            dispatch({
                type: "HYDRATE_PLAYLISTS",
                payload: formattedData
            })
        }

        if(state.PlayLists === null){
            
            fetchData()
        }
    })


    const addPlaylist = () => {

        dispatch({type:"ADD_PLAYLIST"})
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
                </>
            }
        </PlayListsContainer>
    )
}

export default PlayLists