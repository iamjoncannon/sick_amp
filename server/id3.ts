const NodeID3 = require('node-id3');
const testFolder = './tests/';
const fs = require('fs');
const { resolve } = require('path')

export interface SongObject {
    ID: number 
    ALBUM: string 
    TITLE: string 
    ARTIST: string 
    TRACKNUMBER: string
}

interface songStateType {
    [ key: number ] : SongObject
}

let songState: songStateType = {}

const tunes = fs.readdirSync(resolve(__dirname, "./public/tunes"))

tunes.forEach( async (file : string, i : number) => {

        let tags = await NodeID3.read("./public/tunes/" + file)

        songState[i] = { 
            ID: i, 
            ALBUM: "", 
            TITLE: "",
            ARTIST: "",
            TRACKNUMBER: ""
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
    
module.exports = songState
