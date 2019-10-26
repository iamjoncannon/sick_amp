import React from 'react';
const useEffect = (React as any).useEffect;
import {Store} from './Store'
import styled from 'styled-components'
import axios from 'axios'

const PlayListContainer = styled.div`
    height: 100vh;
    width: 25vw;
    background-color: black;
    border: 1px solid black;
`

const PlayLists = () => {
    
    const { state, dispatch } = React.useContext(Store);

    React.useEffect( ()=>{
        async function fetchData(){
            let { data } = await axios.get('/data')

            dispatch({
                type: "HYDRATE",
                payload: data
            })

        }

        if(state.Songs === null){

            fetchData()
        }
    })

    return (
        <PlayListContainer>

        </PlayListContainer>
    )
}

export default PlayLists