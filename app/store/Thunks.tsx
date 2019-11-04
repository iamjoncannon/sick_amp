const { default: axios } = require('axios');
import { api_url } from '../../config'

// called by PlayLists 

export async function fetchInitialData(token: string, dispatch: any){

    axios.get(`${api_url}/folders/?api_key=${token}`).then(( { data } )=>{
    
        const formattedData = {}
        
        for(let playlist in data){

            formattedData["All"] = { name: "All Songs", hydrated: {}  }
            
            // make sure the local hash key is the same 
            // as the id returned from the server
            formattedData[data[playlist].id] = data[playlist]
            
            // add hydrated boolean to prevent manage
            // fetching of data for each playlist 
            formattedData[data[playlist].id].hydrated = {}
        }

        dispatch({
            type: "HYDRATE_PLAYLISTS",
            payload: formattedData
        })
        
    }).catch(err=>console.log(err))

    hydrateSongs(token, dispatch, "All", 1)
}

// called by EditablePlayList

export async function postPlayList(name: string, token: string, dispatch: any){

    let result

    try{

        result = await axios.post(`${api_url}/folders/?api_key=${token}`, { name })
    }
    catch(err){

        console.log(err)
        return 
    }

    dispatch({type: 'UPDATE_PLAYLISTS', payload: result.data})
}

export async function putPlayList(name: string, token: string, dispatch: any){

    let result
    
    try{
        
        result = await axios.put(`${api_url}/folders/?api_key=${token}`, { name })
    }
    catch(err){

        console.log(err)
        dispatch({type: "CANCEL_UPDATE_PLAYLISTS"})
        return 
    }

    console.log('not hitting')
    console.log(result)
    
    dispatch({type: 'UPDATE_PLAYLISTS', payload: result.data})
}

// called by Songs 

export async function hydrateColumns(token: string, dispatch: any){

    let data 

    try{
        data = await axios.get(`${api_url}/fields?api_key=${token}`)
    }
    catch(err){
        console.log(err)
    }

    dispatch({
        type: "HYDRATE_COLUMNS",
        payload: data
    })

}

// called by SongTable 

export async function hydrateSongs(token: string, dispatch: any, PlayList: string, Page: number){

    axios.get(`${api_url}/files/?page=${Page}&api_key=${token}`).then(( { data } )=>{
    
        const formattedData = {}

        for(let song in data){

            const { id } = data[song]

            formattedData[id] = data[song]
        }

        if(Object.keys(formattedData).length === 0){

            dispatch({
                type: "PLAYLIST_END",
                payload: { PlayList, Page }
            })
        }
        else{
            
            dispatch({
                type: "HYDRATE_SONGS",
                payload: { PlayList: PlayList, Page, data: formattedData }
            })
        }

    }).catch(err=>console.log(err))
}



