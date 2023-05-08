# GITHUB ACTIONS

Demonstrate a few monorepo techniques for nx.  

## NOTES

* 

## Watching pipelines

```sh
export PAGER=  
gh run list

# jump to latest run
gh run view --web

# view latest run
gh run view 4913698673                     

# get failed logs 
gh run view 4913698673 --log-failed    
```

## Resources

* Generating Dynamic GitHub Actions Workflows with the Job Matrix Strategy [here](https://brunoscheufler.com/blog/2021-10-09-generating-dynamic-github-actions-workflows-with-the-job-matrix-strategy)
* returntocorp/semgrep-action repo [here](https://github.com/returntocorp/semgrep-action)  
* Using jobs in a workflow [here](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow)
* dflook/terraform-github-actions repo [here](https://github.com/dflook/terraform-github-actions)  
* Getting Started: Scanning Terraform using Semgrep [here](https://medium.com/@tysiew/getting-started-scanning-terraform-using-semgrep-408b6722347c)  

https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/