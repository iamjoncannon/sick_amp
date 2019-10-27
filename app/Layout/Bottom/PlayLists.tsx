import React from 'react';
const useEffect = (React as any).useEffect;
import { Store } from '../../store/Store'
import styled from 'styled-components'
import axios from 'axios'
import { sortColumns } from './Helpers'
import * as Types from '../../store/Types'

const PlayListContainer = styled.div`

    margin-top: .5rem;

    .selected {

        border: 1px solid white;
    }

    span:focus{
        background: white;
    }

    &:hover{
        background: white;
    }

    span:hover{
        opacity: .5;
    }
`

interface PlaylistContainerProps {
    key: string | number
    data: { 
        Title: string, 
        id: string | number, 
        ids?: number[]
    }
}

interface PlaylistEachProps {
    id: any
}

const PlayListEach = styled.span<PlaylistEachProps>``


const Playlist = (props: PlaylistContainerProps) => {

    const { state, dispatch } = React.useContext(Store);

    const handleClick = (id: number | string) => {

        dispatch({
            type:"SELECT_PLAYLIST",
            payload: id
        })
    }

    const onDragOver = (e : any) => {
    
        e.preventDefault()
    }

    const onDrop = (e: any) => {

        const selected = e.dataTransfer.getData( "track")

        dispatch({
            type: "ADD_SONG_TO_PLAYLIST",
            payload: {
                song: selected,
                playlist: e.target.id
            }
        })
    }

    return(
        <PlayListContainer 
            onClick={()=>handleClick(props.data.id)}
            onDragOver={e=> onDragOver(e)}
            onDrop={(e)=>onDrop(e)}
        >
      
            <PlayListEach id={props.data.id}> ♫ {props.data.Title} </PlayListEach>
        </PlayListContainer>
    )
}

const PlayListsContainer = styled.div`
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
        <PlayListsContainer>
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
        </PlayListsContainer>
    )
}

export default PlayLists