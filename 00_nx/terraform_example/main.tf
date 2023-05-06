terraform {
  required_version = "=1.4.5"

  backend "local" {
    path = "./state/terraform.tfstate"
  }
}

#################################################
## Variables
#################################################

variable "output_path" {
  type = string
  default = "./output"

  validation {
    condition = startswith(var.output_path, "./") && (length(var.output_path) > 2)
    error_message = "PAth has to start with './' and be longer than 2 characters."
  }
}

#################################################
## Locals
#################################################

locals {
  source_files_path = "./source_files"
  contents = fileset(local.source_files_path, "*.txt")
}

#################################################
## Resources
#################################################

resource "local_file" "files" {
  for_each = local.contents
  content  = file(join("/", [local.source_files_path, basename(each.value)]))
  filename = join("/", [var.output_path, basename(each.value)])
}


