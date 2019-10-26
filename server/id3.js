var NodeID3 = require('node-id3');
var testFolder = './tests/';
var fs = require('fs');
var resolve = require('path').resolve;
var songState = {};
fs.readdirSync(resolve(__dirname, "../public/tunes")).forEach(function (file, i) {
    var tags = NodeID3.read("./public/tunes/" + file);
    songState[i] = {
        ID: i,
        ALBUM: "",
        TITLE: "",
        ARTIST: "",
        TRACKNUMBER: ""
    };
    for (var tag in tags) {
        if ((tag !== "raw") && (tag !== "image")) {
            songState[i][tag.toUpperCase()] = tags[tag];
        }
        if (tag === "composer") {
            songState[i]["ARTIST"] = tags[tag];
        }
        if (tag === "raw") {
            // console.log(tags[tag])
            if (tags[tag].TSSE) {
                songState[i]["ALBUM"] = tags[tag].TSSE;
            }
        }
    }
});
console.log(songState);
// let file = "./public/tunes/001 - 0125 - 8 Utopia [brain floss mix].mp3"
