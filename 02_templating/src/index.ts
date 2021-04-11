import * as fs from 'fs';
import * as path from 'path';

function main() {
    var filePath = path.join(__dirname, "template.md")
    console.log('Path: "' + filePath + '"') 

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        console.log(data);
    })    
}

main()