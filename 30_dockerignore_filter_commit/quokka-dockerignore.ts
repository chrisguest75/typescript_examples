import * as fs from 'fs';
import ignore from '@balena/dockerignore';
// git show --pretty="format:" --name-only --stat --oneline head
// git show --pretty="format:" --name-only --stat --oneline f6f358b

function loadCommit(filePath: string) {
    const file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file);
}

async function complexTest() {
    //const paths = loadCommit('./commits/f6f358b.json').files
    const paths = loadCommit('./commits/b363e88.json').files
    
    console.log(paths)
    const ig = ignore().add([
        '*', 
        '!00_project_templates',
        '!03_jest_testing'
    ])

    const filtered = ig.filter(paths)      
    //const ignored = ig.ignores('00_project_templates/README.md') 
    
    if (filtered.length == 0) {
        console.log( { message: 'Build will not be triggered', filtered } )
    } else {
        console.log( { message: 'Build will be triggered', filtered } )
    }
}

//simpleTest()
complexTest()