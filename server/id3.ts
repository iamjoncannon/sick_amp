const NodeID3 = require('node-id3');
const testFolder = './tests/';
const fs = require('fs');
const { resolve } = require('path')

interface SongObject {
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

fs.readdirSync(resolve(__dirname, "../public/tunes")).forEach( (file : string, i : number) => {

    let tags = NodeID3.read("./public/tunes/" + file)

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

            // console.log(tags[tag])
            if(tags[tag].TSSE){
                songState[i]["ALBUM"] = tags[tag].TSSE
            }
        }
    }
});

console.log(songState)

// let file = "./public/tunes/001 - 0125 - 8 Utopia [brain floss mix].mp3"

