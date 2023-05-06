# README

Demonstrates an example of using terraform in an nx repo.  

## Demonstrates

```sh
terraform init
terraform plan 

# apply the plan
terraform apply -auto-approve

# print out the container id
terraform output

# list the objects
terraform state
```

## Investigating state

```sh
# NOTE: Is there a way of examining the current state through this?
terraform console

terraform state list
```

EDIT: Go edit the `main.tf` to include the moved block and the renamed resources.  

```sh
terraform plan 
terraform apply

# resources will still exist but will be moved
# also check the state only refers to new_files
terraform state list 
```

## Resources

