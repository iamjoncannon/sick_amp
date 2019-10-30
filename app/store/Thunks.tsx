import { Store } from 'Store'
import axios from 'axios'
import { remote_url } from '../../config'

// called by PlayLists 
export async function fetchInitialData(token: string, dispatch: any){

    let { data } = await axios.get(`${remote_url}/folders/?api_key=${token}`)
    
    const formattedData = {}
    
    for(let playlist in data){

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

