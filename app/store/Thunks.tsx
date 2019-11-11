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

    const endpoint = `${api_url}/folders/?api_key=${token}`
    let result
    
    try{
        
        result = await axios.put(endpoint, { name })
    }
    catch(err){

        console.log(err)
        dispatch({type: "CANCEL_UPDATE_PLAYLISTS"})
        return 
    }
    
    dispatch({type: 'UPDATE_PLAYLISTS', payload: result.data})
}

// addSongToPlaylist POST /files/{file_id}/folders/{folder_id}

export async function addSongToPlaylist(folder_id: number, song_id: number, token: string, dispatch: any){

    const endpoint = `${api_url}/files/${song_id}/folders/${folder_id}?api_key=${token}`

    let result 

    try {

        result = await axios.post(endpoint)
    }
    catch(err){

        console.log("addSongToPlaylist thunk error: ", err)
        return
    }

    console.log(result)


    /*

    dispatch({
                type: "ADD_SONG_TO_PLAYLIST",
                payload: {
                    newPlayListObject = result.data,
                    playlist_id: folder_id
                }
            })

    */

}


export async function rearrange_playlist(folder_id: number, song_id: number, position: number, token: string, dispatch: any){

    // files/{fileid}/folders/{folderid} { position: int }
    const endpoint = `${api_url}/files/${song_id}/folders/${folder_id}?api_key=${token}`
    
    let result
    
    try{
        
        result = await axios.put(endpoint, { position })
    }
    catch(err){

        console.log(err)
        dispatch({type: "CANCEL_UPDATE_PLAYLISTS"})
        return 
    }

    dispatch({
        type: "REARRANGE_PLAYLIST",
        payload: {
            
            updatedPlaylist: result.data
        }
    })

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



