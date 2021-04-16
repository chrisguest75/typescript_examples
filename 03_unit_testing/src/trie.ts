// TODO:
// Docuentation in comments
// Linting?
// Work out how to remove infectious undefined.
// github actions run the jest tests

class trie_node {
    nodes: Map<string, trie_node> = new Map<string, trie_node>();

    // why does this need undefined?
    add(letter: string): trie_node | undefined {
        if (! this.nodes.has(letter)) {
            this.nodes.set(letter, new trie_node());
        }
        return this.nodes.get(letter);
    }

    contains(word: string): boolean {
        if (word.length == 1) {
            return this.nodes.has(word);
        } else {
            let sliced = word;
            let current_nodes = this.nodes;
            for (let i: number = 0; i < sliced.length; i++) {
                let letter = sliced.slice(0, 1);
                sliced = sliced.slice(1);    
                if (current_nodes.has(letter)) {
                    // the undefined is becoming infectious.  
                    current_nodes = current_nodes.get(letter)?.nodes;
                }
            }
        }
    }    
}
export class trie {
    size: number;
    nodes: trie_node = new trie_node();

    constructor() {
        this.size = 0 
    }

    add(word: string) {
        if (word.length > 0) {
            let letter = word.slice(0, 1);
            let node = this.nodes.add(letter);
            this.size++;
        }
    }

    contains(word: string): boolean {
        if (word.length > 0) {
            return this.nodes.contains(word);
        } else {
            return false;
        }
    }    
}
