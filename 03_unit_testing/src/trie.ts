// TODO:
// Docuentation in comments
// Linting?
// Work out how to remove infectious undefined.
// github actions run the jest tests

class trie_node {
    // a map of characters to child nodes
    nodes: Map<string, trie_node> = new Map<string, trie_node>();

    // add a letter and return the child node
    add(letter: string): trie_node {
        if (! this.nodes.has(letter)) {
            // if the letter does not exists we add it
            this.nodes.set(letter, new trie_node());
        }
        // at this point the letter should always exist as we have just added it if it didn't.
        // NOTE: even though get should always return trie_node() compiler doesn't trust me
        return this.nodes.get(letter) || new trie_node();
    }

    contains(word: string): boolean {
        if (word.length == 1) {
            // if word is a single letter we just check it exists
            return this.nodes.has(word);
        } else {
            // descend through trie
            let sliced = word;
            let current_nodes: Map<string, trie_node> = this.nodes;
            for (let i: number = 0; i < sliced.length; i++) {
                // take top letter
                let letter = sliced.slice(0, 1);
                sliced = sliced.slice(1);    
                if (current_nodes.has(letter)) {
                     let x = current_nodes.get(letter) || new trie_node();
                     current_nodes = x.nodes;
                } else {
                    return false;
                }
            }
            return true;
        }
    }    
}
export class trie {
    // number of words stored in the trie
    size: number;
    // root of the trie
    nodes: trie_node = new trie_node();

    constructor() {
        this.size = 0 
    }

    // add a word 
    add(word: string) {
        // add only if word has letters
        let current = word;
        if (current.length > 0) {
            let node = this.nodes;
            while (current.length > 0) {
                // take first letter
                let letter = current.slice(0, 1);
                // add it to the trie
                node = node.add(letter);
                current = current.slice(1);
            }

            this.size++;
        }
    }

    // does the trie contain a word
    contains(word: string): boolean {
        if (word.length > 0) {
            return this.nodes.contains(word);
        } else {
            // words with no letters do not exist
            return false;
        }
    }    
}
