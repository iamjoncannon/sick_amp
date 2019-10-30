import React from 'react';
const useEffect = (React as any).useEffect;
import { Store } from '../../store/Store'
import styled from 'styled-components'
import axios from 'axios'
import { sortColumns } from './Helpers'
import * as Types from '../../store/Types'

const PlayListContainer = styled.div`

    margin-top: .5rem;

    span:focus{
        background: white;
    }

    &:hover{
        background: ${props=>props.theme.tertiaryColor};
    }
`


interface PlaylistContainerProps {
    key: string | number
    id: string | number
}

const PlayList = (props: PlaylistContainerProps) => {

    const { state, dispatch } = React.useContext(Store);

    const { id } = props 

    const { PlayLists, 
            RunningPlaylist, 
            SelectedPlaylist, 
            draggedOverPlaylist 
         } = state 

    const { name } = PlayLists[id]

    const handleClick = (id: number | string) => {

        dispatch({
            type:"SELECT_PLAYLIST",
            payload: id
        })
    }

    const onDragOver = (e : any) => {
    
        e.preventDefault()

        if(state.draggedOverPlaylist !== id){

            dispatch({ type: "DRAG_OVER_PLAYLIST", payload: id })
        }
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

    let selectionState

    if(draggedOverPlaylist === id ){

        selectionState = "draggedOver"
    }
    else if(id === SelectedPlaylist){

        selectionState = "selected"
    }

    return(

        <PlayListContainer 
            onClick={()=>handleClick(id)}
            onDragOver={ e=> onDragOver(e)}
            onDrop={(e)=>onDrop(e)}
            id={ selectionState }

        >
            <span 
                id={id} 
            >{name}{id === RunningPlaylist && " ♫"}</span>

        </PlayListContainer>
    )
}
// 
export default PlayList