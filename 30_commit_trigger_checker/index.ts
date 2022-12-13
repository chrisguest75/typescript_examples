import * as fs from 'fs';
import ignore from '@balena/dockerignore';
import process from 'process';
import { getSystemErrorMap } from 'util';

// git show --pretty="format:" --name-only --stat --oneline head | tail -n +2 
// git show --pretty="format:" --name-only --stat --oneline f6f358b | tail -n +2 

function loadLines(filePath: string) {
    const file = fs.readFileSync(filePath, 'utf8');
    return file.split('\n')
        .filter(Boolean);
}

function testIfTrigger(commitsPath: string, dockerignorePath: string): number {
    //const paths = loadCommit('./commits/f6f358b.json').files
    const paths = loadLines(commitsPath)
    const dockerignore = loadLines(dockerignorePath)
    
    console.log({ paths })
    console.log({ dockerignore })
    const ig = ignore().add(dockerignore)

    const filtered = ig.filter(paths)      
    //const ignored = ig.ignores('00_project_templates/README.md') 
    
    let trigger = 0
    if (filtered.length == 0) {
        console.log( { message: 'Build will not be triggered', filtered } )
    } else {
        console.log( { message: 'Build will be triggered', filtered } )
        trigger = 1
    }

    return trigger
}

const commandArgs = process.argv.slice(2);
console.log({ commandArgs });

let commitsPath = ""
let dockerIgnorePath = ""
if (commandArgs.length >= 1) {
    commitsPath = commandArgs[0]
}
if (commandArgs.length >= 2) {
    dockerIgnorePath = commandArgs[1]
}

if (process.env.COMMITSPATH) {
    commitsPath = process.env.COMMITSPATH
}

if (process.env.DOCKERIGNOREPATH) {
    dockerIgnorePath = process.env.DOCKERIGNOREPATH
}

let trigger = 0
if (commitsPath && dockerIgnorePath) {
    trigger = testIfTrigger(commitsPath, dockerIgnorePath)
} else {
    console.log("Missing arguments COMMITSPATH and DOCKERIGNOREPATH")
    trigger = 2
}

console.log({ trigger })
process.exit(trigger)
