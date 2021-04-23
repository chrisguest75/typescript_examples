import {Repository, Commit, Time}  from 'nodegit';
import minimist from 'minimist';
import TimeSpan from 'typescript-dotnet-commonjs/System/Time/TimeSpan';
import TimeUnit from 'typescript-dotnet-commonjs/System/Time/TimeUnit';

// TODO:
// * Pull out commits in a specific branch in hour chunks
// * Write the values out to a file
// * Render them in SVG. 
 
class Commits {
    commits: Array<Commit> = new Array<Commit>();

}

var getMostRecentCommit = function(repository: Repository) {
    return repository.getBranchCommit("master");
};

var getCommits = function(commit: Commit) {
    var history = commit.history();

    // Create a counter to only show up to 9 entries.
    var count = 0;

    // Listen for commit events from the history.
    history.on("commit", function(commit: Commit) {
        // Disregard commits past 9.
        if (++count >= 9) {
            return;
        }

        // Show the commit sha.
        console.log("commit " + commit.sha());

        // Store the author object.
        var author = commit.author();

        // Display author information.
        console.log("Author:\t" + author.name() + " <" + author.email() + ">");

        // Show the commit date.
        console.log("Date:\t" + commit.date());
        console.log("TimeOffset:\t" + commit.timeOffset());
        console.log("TimeMS:\t" + commit.timeMs());
        console.log("Time:\t" + commit.time());
        let now = new Date().getTime();
        let offset = new TimeSpan(now - commit.timeMs())
        console.log("ConvertedTime:\t" + offset.getTotal(TimeUnit.Hours));

        // Give some space and show the message.
        console.log("\n    " + commit.message());
    });

    // Start emitting events.
    history.start();

};

var getCommitMessage = function(commit: Commit) {
    return commit.message();
};



async function main(args: minimist.ParsedArgs) 
{
    console.log('Pull out commits in a specific branch in hour chunks');
    
    Repository.open("../.git")
        .then(getMostRecentCommit)
        .then(getCommits);

    console.log('Leaving');  
    return new Promise((resolve, reject) => {
    });         
}

let args: minimist.ParsedArgs = minimist(process.argv.slice(2));
main(args).then(() => {
    process.exit(0)
}).catch((e) => {
    console.log(e);
    process.exit(1);
});



/*
var Git = require("nodegit");

// Open the repository directory.
Git.Repository.open("tmp")
  // Open the master branch.
  .then(function(repo) {
    return repo.getMasterCommit();
  })
  // Display information about commits on master.
  .then(function(firstCommitOnMaster) {
    // Create a new history event emitter.
    var history = firstCommitOnMaster.history();

    // Create a counter to only show up to 9 entries.
    var count = 0;

    // Listen for commit events from the history.
    history.on("commit", function(commit) {
      // Disregard commits past 9.
      if (++count >= 9) {
        return;
      }

      // Show the commit sha.
      console.log("commit " + commit.sha());

      // Store the author object.
      var author = commit.author();

      // Display author information.
      console.log("Author:\t" + author.name() + " <" + author.email() + ">");

      // Show the commit date.
      console.log("Date:\t" + commit.date());

      // Give some space and show the message.
      console.log("\n    " + commit.message());
    });

    // Start emitting events.
    history.start();
  });
  */