export default class SuffixTrie {

    root: object 
    endSymbol: string 

    constructor(input_arr? : string[]){

           this.root = {}
           this.endSymbol = "*"
           input_arr && this.populateSuffixTrieFrom(input_arr)
    }

    loadTree = (previousTree: object) => {

           this.root = previousTree
    }

    populateSuffixTrieFrom = (input_arr : string[]) => {

           for(let string of input_arr){

                  for(let i = 0; i < string.length; i++){

                         this.insertSubstringStartingAt(i, string)
                  }
           }

    }

    insertSubstringStartingAt = (i : number, string: string) => {

           let node = this.root
           
           for(let j = i; j < string.length; j++){

                  let letter = string[j]

                  if( !(letter in node) ){

                         node[letter] = {}
                  }

                  if(node[this.endSymbol]){

                     node[this.endSymbol].push(string)
                  }
                  else{
       
                     node[this.endSymbol] = [string]
                  }

                  node = node[letter]
           }

           if(node[this.endSymbol]){

              node[this.endSymbol].push(string)
           }
           else{

              node[this.endSymbol] = [string]
           }
    }

    containsString = (string: string) => {

           let node = this.root

           for(let i = 0; i < string.length; i++){

                  if(!(string[i] in node)){

                         return false 
                  }
                  else{
                         node = node[string[i]]
                  }
           }

         return node[this.endSymbol]
    }
}
