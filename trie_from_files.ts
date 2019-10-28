const NodeID3 = require('node-id3');
const testFolder = './tests/';
const fs = require('fs');
const { resolve } = require('path')
import * as Types from './server/Types'
import SuffixTrie from './suffixTrie'

const files = fs.readdirSync(resolve(__dirname, "./public/tunes"))

const theTrie = new SuffixTrie(files)

console.log(theTrie.containsString(process.argv[2]))