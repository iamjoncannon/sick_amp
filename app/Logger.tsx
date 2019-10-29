import React from 'react';
const useEffect = (React as any).useEffect;
import { Store } from './store/Store'
import axios from 'axios'
import { sortColumns } from './Helpers'
import * as Types from './store/Types'

const Logger = () => {

    const { state } = React.useContext(Store);

    /*
    
    React.useEffect( ()=>{

        async function fetchData(){

            // let { data } = await axios.get('http://localhost:3030/files?api_key=dev')
            // let { data } = await axios.get('/data')

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

    */

    console.log("Next State: ", state)

    return(
        <>
        </>
    )
}

export default Logger
