import * as fs from 'fs';
import ignore from '@balena/dockerignore';
// git show --pretty="format:" --name-only --stat --oneline head | tail -n +2 
// git show --pretty="format:" --name-only --stat --oneline f6f358b | tail -n +2 

function loadLines(filePath: string) {
    const file = fs.readFileSync(filePath, 'utf8');
    return file.split('\n')
        .filter(Boolean);
}

async function complexTest() {
    //const paths = loadCommit('./commits/f6f358b.json').files
    const paths = loadLines('./commits/b363e88.txt')
    const dockerignore = loadLines('./test.dockerignore')
    
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

//simpleTest()
complexTest()