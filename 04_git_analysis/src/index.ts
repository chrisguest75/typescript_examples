import nodegit  from 'nodegit';
//import {Repository, Commit, Time}  from 'nodegit';
import minimist from 'minimist';
import TimeSpan from 'typescript-dotnet-commonjs/System/Time/TimeSpan';
import TimeUnit from 'typescript-dotnet-commonjs/System/Time/TimeUnit';

// TODO:
// * Pull out commits in a specific branch in hour chunks
// * Write the values out to a file
// * Render them in SVG. 

/*function printCommit(commit: nodegit.Commit) {
    // Show the commit sha.
    console.log("commit " + commit.sha());

    // Store the author object.
    var author = commit.author();

    // Display author information.
    console.log("Author:\t" + author.name() + " <" + author.email() + ">");

    // Show the commit date.
    console.log("Date:\t" + commit.date());
    //console.log("TimeOffset:\t" + commit.timeOffset());
    //console.log("TimeMS:\t" + commit.timeMs());
    //console.log("Time:\t" + commit.time());
    let now = new Date().getTime();
    let offset = new TimeSpan(now - commit.timeMs())
    console.log("Hours Ago:\t" + offset.getTotal(TimeUnit.Hours));

    // Give some space and show the message.
    console.log("\n    " + commit.message());
}*/

function waitForCommits (emitter: any) {
	return new Promise<Array<nodegit.Commit>>((resolve, reject) => {
		emitter.once('end', resolve);
	})
}

async function statisticsForBranch(repo: nodegit.Repository, name: string) {
    let head_commit: nodegit.Commit = await repo.getBranchCommit(name);
    
    // this should really be HistoryEventEmitter
    let history = head_commit.history();
    console.log(`Retrieved head commit for ${name}`);  

    history.start(); 

    // wait for commits event to complete
    const commits: Array<nodegit.Commit> = await waitForCommits(history)

    return new Promise<Map<number, number>>((resolve, reject) => {
        let values = new Map<number, number>()
        commits.forEach(commit => {
            let now = new Date().getTime();
            let offset = new TimeSpan(now - commit.timeMs());
            let total = Math.floor(offset.getTotal(TimeUnit.Hours) / 24);
            console.log("Hours Ago:\t" + total);
            //printCommit(commit);
            if (values.has(total)){
                let value = values.get(total) || 0;
                values.set(total, value++);
            } else {
                values.set(total, 1);
            }
        });
        resolve(values);
    });      
}


/*
main
*/
async function main(args: minimist.ParsedArgs) 
{
    console.log('enter main:'+ args._);
    let repository_path: string = "../.git";
    if (args._.length > 0) {
        // first arg is repository path
        repository_path = args._[0];
    }
    
    const repo: nodegit.Repository = await nodegit.Repository.open(repository_path);
    console.log(`${repository_path} opened`);  
    
    let map = new Map<string, Map<number, number>>();

    const branches: Array<string> = ["master", "nodegit", "origin/testing"]

    for (let i: number = 0; i < branches.length; i++ ) {
        const branch = branches[i];
        const stats: Map<number, number> = await statisticsForBranch(repo, branch);
        map.set(branch, stats);
    
        const commits: Map<number, number> = map.get(branch) || new Map<number, number>();
        Array.from(commits.keys()).forEach(key => console.log(key));

        const timeline: Array<number> = new Array<number>();
        for (let h: number = 0; h < 30; h++ ) {
            timeline.push(commits?.get(h) || 0)        
        }
        console.log(`${branch} [${timeline}]`);
    }

    console.log('exit main');  

    return new Promise((resolve, reject) => {
    });         
}

/*
Entrypoint
*/
let args: minimist.ParsedArgs = minimist(process.argv.slice(2));
main(args).then(() => {
    process.exit(0)
}).catch((e) => {
    console.log(e);
    process.exit(1);
});

