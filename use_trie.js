var Trie = require('./suffixTrie')["default"];
var previous_trie = require('./song_metadata_trie');
var song_data = require("./file_data");
var MetaDataTrie = new Trie();
MetaDataTrie.loadTrie(previous_trie);
var results = MetaDataTrie.test(process.argv[2]);
if (!Array.isArray(results)) {
    console.log("Not in Database");
    process.exit(1);
}
results.forEach(function (id) {
    console.log(song_data.Songs[id]);
});
