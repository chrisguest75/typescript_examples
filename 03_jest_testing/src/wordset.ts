import { wordstore } from "./wordstore";

export class wordset implements wordstore {
    private words = new Map<string, boolean>();
    
    constructor() {
        // do nothing
    }

    public get size(): number {
        return this.words.size
    }

    // add a word 
    public add(word: string) {
        if (word.length > 0) {
            this.words.set(word, true)
        }        
    }

    // does the trie contain a word
    public contains(word: string): boolean {
        return this.words.has(word)
    }      
}

