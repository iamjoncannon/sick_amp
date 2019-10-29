const Trie = require('./suffixTrie').default
const previous_trie = require('./song_metadata_trie')
const song_data = require("./file_data")
const MetaDataTrie = new Trie()

MetaDataTrie.loadTrie(previous_trie)

let results = MetaDataTrie.test(process.argv[2])

if(!Array.isArray(results)){
 
    console.log("Not in Database")
    process.exit(1)
}

results.forEach(id=>{

    console.log(song_data.Songs[id])
})