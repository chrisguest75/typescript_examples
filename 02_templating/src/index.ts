import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';

function main() {
    var filePath = path.join(__dirname, "template.md")
    console.log('Path: "' + filePath + '"') 

    // have to provide the encodiing to read it correctly
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        let people = ['geddy', 'neil', 'alex'];
        let html = ejs.render(data, {people: people});    
        console.log(html);
    })  
    
}

main()