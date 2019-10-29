const NodeID3 = require('node-id3');
const testFolder = './tests/';
const fs = require('fs');
const { resolve } = require('path')
import * as Types from './Types'

let songState: Types.songStateType = {}

const tunes = fs.readdirSync(resolve(__dirname, "./public/tunes/rnb"))

tunes.forEach( async (file : string, i : number) => {

        let tags 
        
        try{
            
            tags = await NodeID3.read("./public/tunes/" + file)
        }
        catch(err){

            console.log(err)
        }
        
        songState[i] = { 
            ID: i, 
            ALBUM: "", 
            TITLE: "",
            ARTIST: "",
            TRACKNUMBER: "",
            FILENAME: file
        }

        for(let tag in tags){
        
            if( (tag !== "raw") && ( tag !== "image" )){

                songState[i][tag.toUpperCase()] = tags[tag]
            }

            if(tag === "composer"){

                songState[i]["ARTIST"] = tags[tag]
            }

            if(tag === "raw"){

                if(tags[tag].TSSE){
                    songState[i]["ALBUM"] = tags[tag].TSSE
                }
            }
        }
})

const playlists : Types.Playlist[] = [
    {
        Title: "Aphex",
        id: 0,
        ids: [1,2,3,4,5,6,7,8]
    },
    {
        Title: "Sigrid",
        id: 1,
        ids: [9,7,8]
    }
]

const returnData : Types.returnDataType = {

    Songs: songState,
    PlayLists : playlists
}

module.exports = returnData
