const SuffixTrie = require('./suffixTrie').default
const { resolve } = require("path")

async function get_mp3_data(){

    const data = await require("./id3") 

    return data 
}

get_mp3_data().then(result=>{ 
    
    require('fs').writeFile("file_data.json", JSON.stringify(result), (err)=>{

        if(err) throw err
    })

    // create suffix trie
    
    const MetaDataTrie = new SuffixTrie()

    // store each property in each file metadata, with
    // the song id as the trie payload 

    const { Songs } = result 

    for(let song in Songs){

        let payload = song 

        let metadata = Songs[song]

        for(let dataItem in metadata){

            if(dataItem !== payload){

                MetaDataTrie.insertIntoTrie(metadata[dataItem], payload)
            }
        }
    }

    require('fs').writeFile("song_metadata_trie.json", JSON.stringify(MetaDataTrie.root), (err)=>{

        if(err) throw err
    })

})
