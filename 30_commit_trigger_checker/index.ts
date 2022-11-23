import * as fs from 'fs';
import ignore from '@balena/dockerignore';
import process from 'process';



// git show --pretty="format:" --name-only --stat --oneline head | tail -n +2 
// git show --pretty="format:" --name-only --stat --oneline f6f358b | tail -n +2 

function loadLines(filePath: string) {
    const file = fs.readFileSync(filePath, 'utf8');
    return file.split('\n')
        .filter(Boolean);
}

async function complexTest(commitsPath: string, dockerignorePath: string) {
    //const paths = loadCommit('./commits/f6f358b.json').files
    const paths = loadLines(commitsPath)
    const dockerignore = loadLines(dockerignorePath)
    
    console.log(paths)
    const ig = ignore().add(dockerignore)

    const filtered = ig.filter(paths)      
    //const ignored = ig.ignores('00_project_templates/README.md') 
    
    if (filtered.length == 0) {
        console.log( { message: 'Build will not be triggered', filtered } )
    } else {
        console.log( { message: 'Build will be triggered', filtered } )
    }
}

const myArgs = process.argv.slice(2);
console.log('args: ', myArgs);

let commitsPath = ""
let dockerIgnorePath = ""
if (myArgs.length >= 1) {
    commitsPath = myArgs[0]
}
if (myArgs.length >= 2) {
    dockerIgnorePath = myArgs[1]
}

if (process.env.COMMITSPATH) {
    commitsPath = process.env.COMMITSPATH
}

if (process.env.DOCKERIGNOREPATH) {
    dockerIgnorePath = process.env.DOCKERIGNOREPATH
}

if (commitsPath && dockerIgnorePath) {
    complexTest(commitsPath, dockerIgnorePath)
} else {
    console.log("Missing arguments COMMITSPATH and DOCKERIGNOREPATH")
}
