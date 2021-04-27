import {Repository, Commit, Time}  from 'nodegit';
import minimist from 'minimist';
import TimeSpan from 'typescript-dotnet-commonjs/System/Time/TimeSpan';
import TimeUnit from 'typescript-dotnet-commonjs/System/Time/TimeUnit';

// TODO:
// * Pull out commits in a specific branch in hour chunks
// * Write the values out to a file
// * Render them in SVG. 
 
var storeCommit = function(commit: Commit) {
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
}

class CommitStats {
    branch: string;
    path: string;
    commits: Array<Commit> = new Array<Commit>();

    constructor(path: string, branch: string = "master") {
        this.branch = branch;
        this.path = path;
    }

    process() {
        Repository.open(this.path)
            .then(function(repository: Repository) {
                return repository.getHeadCommit();
                //return repository.getBranchCommit("master");
            }).then(function(commit: Commit) {
                var history = commit.history();
            
                // Listen for commit events from the history.
                history.on("commit", function(commit: Commit) {
                    storeCommit(commit);
                });
            
                // Start emitting events.
                history.start(); 
            });
    }
}

/*

*/
async function main(args: minimist.ParsedArgs) 
{
    console.log('Pull out commits in a specific branch in hour chunks');
    
    //let commits = new CommitStats("../../../conde/verso/.git");
    let commits = new CommitStats("../.git");

    //process the commits
    commits.process();    

    console.log('Leaving');  
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

