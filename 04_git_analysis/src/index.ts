import {Repository, Commit}  from 'nodegit';

var getMostRecentCommit = function(repository: Repository) {
    return repository.getBranchCommit("master");
  };
  
var getCommitMessage = function(commit: Commit) {
    return commit.message();
};

function main() 
{
    console.log('Hello world!!!!!!!!!');
    
    Repository.open("../.git")
        .then(getMostRecentCommit)
        .then(getCommitMessage)
        .then(function(message) {
            console.log(message);
        }).catch(function(message) {
            console.log(message);
        });

    console.log('Leaving');       
}

main()