import React from 'react';
const useEffect = (React as any).useEffect;
import {Store} from './Store'
import styled from 'styled-components'
import axios from 'axios'
import { sortColumns } from './Helpers'

const PlayListContainer = styled.div`
    height: 100vh;
    width: 10vw;
    background-color: black;
    border: 1px solid black;
`

const PlayLists = () => {
    
    const { state, dispatch } = React.useContext(Store);

    React.useEffect( ()=>{

        async function fetchData(){

            let { data } = await axios.get('/data')

            let columnHash = sortColumns(data)

            let sortedData = {
                Songs : data,
                ColumnHash : columnHash 
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

    return (
        <PlayListContainer>

        </PlayListContainer>
    )
}

export default PlayLists