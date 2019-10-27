import React from 'react';
const useEffect = (React as any).useEffect;
import {Store} from './Store'
import styled from 'styled-components'
import axios from 'axios'
import { sortColumns } from './Helpers'
import * as Types from './Types'

const PlayListStyle = styled.div`

    margin-top: .5rem;

    span:hover{
        opacity: .5;
    }
`

interface PlaylistProps {
    key: string | number
    data: { 
        Title: string, 
        id: string | number, 
        ids?: number[]
    }
}

const Playlist = (props: PlaylistProps) => {

    const { state, dispatch } = React.useContext(Store);

    const handleClick = (id: number | string) => {

        dispatch({
            type:"SELECT_PLAYLIST",
            payload: id
        })
    }

    return(
        <PlayListStyle onClick={()=>handleClick(props.data.id)}>
            <span> ♫ {props.data.Title}</span>
        </PlayListStyle>
    )
}

const PlayListContainer = styled.div`
    color: white;
    cursor: default;
    height: 100vh;
    width: 10vw;
    background-color: black;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 1rem;
`

const PlayLists = () => {
    
    const { state, dispatch } = React.useContext(Store);

    React.useEffect( ()=>{

        async function fetchData(){

            let { data } = await axios.get('/data')

            const { Songs, PlayLists } = data

            let ColumnHash = sortColumns(Songs)

            let sortedData = {
                Songs,
                PlayLists,
                ColumnHash
            }

            dispatch({
                type: "HYDRATE",
                payload: sortedData
            })

        }

        if(state.Songs === null){

            fetchData()
        }
    })

    console.log("Next State: ", state)

    return (
        <PlayListContainer>
            <span style={{textDecoration: "underline"}}>Playlists</span>
            <Playlist key={"All"} data={{Title: "All", id: "All"}}/>

            {
                !!state.PlayLists &&
                state.PlayLists.map( (each : Types.Playlist) =>{

                    return (
                        <Playlist key={each.id} data={each} />
                    )
                })
            }
        </PlayListContainer>
    )
}

export default PlayLists