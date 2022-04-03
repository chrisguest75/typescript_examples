
export interface wordstore {
    // number of words stored
    get size(): number;

    // add a word
    add(word: string): void 

    // contains a word
    contains(word: string): boolean 
}
