"use strict";
exports.__esModule = true;
var SuffixTrie = /** @class */ (function () {
    function SuffixTrie(input_arr) {
        var _this = this;
        this.loadTree = function (previousTree) {
            _this.root = previousTree;
        };
        this.populateSuffixTrieFrom = function (input_arr) {
            for (var _i = 0, input_arr_1 = input_arr; _i < input_arr_1.length; _i++) {
                var string = input_arr_1[_i];
                for (var i = 0; i < string.length; i++) {
                    _this.insertSubstringStartingAt(i, string);
                }
            }
        };
        this.insertSubstringStartingAt = function (i, string) {
            var node = _this.root;
            for (var j = i; j < string.length; j++) {
                var letter = string[j];
                if (!(letter in node)) {
                    node[letter] = {};
                }
                if (node[_this.endSymbol]) {
                    node[_this.endSymbol].push(string);
                }
                else {
                    node[_this.endSymbol] = [string];
                }
                node = node[letter];
            }
            if (node[_this.endSymbol]) {
                node[_this.endSymbol].push(string);
            }
            else {
                node[_this.endSymbol] = [string];
            }
        };
        this.containsString = function (string) {
            var node = _this.root;
            for (var i = 0; i < string.length; i++) {
                if (!(string[i] in node)) {
                    return false;
                }
                else {
                    node = node[string[i]];
                }
            }
            return node[_this.endSymbol];
        };
        this.root = {};
        this.endSymbol = "*";
        input_arr && this.populateSuffixTrieFrom(input_arr);
    }
    return SuffixTrie;
}());
exports["default"] = SuffixTrie;
