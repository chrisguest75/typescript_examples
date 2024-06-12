
export class word {
    word: string = "";    
    //sentence_starts: number = 0;
    //sentence_end: number = 0;
    words: Map<string, number> = new Map<string, number>();

    constructor(word: string) {
        this.word = word; 
    }
}

export class splitter {
    private _wordCount: number = 0;
    text: string = "";    
    words: Map<string, word> = new Map<string, word>();

    constructor() {
        this._wordCount = 0 
    }

    get wordCount(): number {
      return this._wordCount;
    }
  
    // add a word 
    split(text: string):  Map<string, word> {
        this.text = text;
        let words = this.text.split(" ");

        words = words.filter(word => word !== '');
        words = words.filter(word => word !== '\n');
        words = words.map(word => word.replace('/n', ''));

        this._wordCount = words.length;

        words.forEach(w => this.words.set(w, new word(w)));

        return this.words;
    }
}