



export class model {
    words: number = 0;
    text: string = "";    

    constructor() {
        this.words = 0 
    }

    // add a word 
    build(text: string) {
        this.text = text;
    }
}