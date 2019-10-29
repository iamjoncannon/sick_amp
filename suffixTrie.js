"use strict";
/*

generate suffix trie from metadata for search bar

"populate" receives item from metadata- a string from
specific field- and the payload- the song id, and
iterates over the string, storing the payload at
each node of the trie

so, if the string is "Aphex Twin", Artist metadata for
an mp3, it iterates across each char in the string
A -> p -> e -> x, and stores the payload- the song id
(ie 150), at each node in the trie. it looks literally
like this--

A {
   p {
      h {
          e{
             x {
                 * {
                     [149, 150, 151]
                   }
             }
             * {
                [149, 150, 151]
              }
          }
        * {
           [149, 150, 151]
        }
       }
    * {
       [149, 150, 151]
    }
  }
  * {
     [149, 150, 151]
  }
}

so if the search string is "Aphex", the "test" method
traverses to the "x" node (line 19 above), then returns
the array stored at the end symbol- [149, 150, 151],
ie the ids of all Aphex tunes in the database

...but, it would also return these ids if the search string
was "A", "Ap", "Aph", or "Aphe", because these ids have been
stored at each of these substrings

(and further... "phe", "hex", "ex", because the method
also iterates *from* each char in the string inserted)

Why do this? Lookup time complexity is virutally constant
(linear across the search string) it only has to perform
lookup operations equal to the chars to be tested:
"A-p-h-e-x"

*/
exports.__esModule = true;
var SuffixTrie = /** @class */ (function () {
    function SuffixTrie() {
        var _this = this;
        this.loadTrie = function (previousTree) {
            _this.root = previousTree;
        };
        this.insertIntoTrie = function (item, payload) {
            for (var i = 0; i < item.length; i++) {
                _this.insertSubstringStartingAt(i, item, payload);
            }
        };
        this.insertSubstringStartingAt = function (i, string, payload) {
            var node = _this.root;
            for (var j = i; j < string.length; j++) {
                var letter = string[j];
                if (!(letter in node)) {
                    node[letter] = {};
                }
                if (node[_this.endSymbol]) {
                    node[_this.endSymbol].push(payload);
                }
                else {
                    node[_this.endSymbol] = [payload];
                }
                node = node[letter];
            }
            if (node[_this.endSymbol]) {
                node[_this.endSymbol].push(payload);
            }
            else {
                node[_this.endSymbol] = [payload];
            }
        };
        this.test = function (string) {
            var node = _this.root;
            for (var i = 0; i < string.length; i++) {
                if (!(string[i] in node)) {
                    return false;
                }
                else {
                    node = node[string[i]];
                }
            }
            return Array.from(new Set(node[_this.endSymbol]));
        };
        this.root = {};
        this.endSymbol = "*";
    }
    return SuffixTrie;
}());
exports["default"] = SuffixTrie;
