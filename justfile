#!/usr/bin/env just --justfile
# ^ A shebang isn't required, but allows a justfile to be executed
#   like a script, with `./justfile test`, for example.

set dotenv-load := true

# default lists actions
default:
  @just -f justfile --list

nix:
  #!/usr/bin/env bash
  set -xeufo pipefail
  nix-shell -p nodejs_20 --command zsh

# generate cli project version; cli,cli18,cli20,cli22
generate-cli name version:
  #!/usr/bin/env bash
  set -xeufo pipefail
  cd 00_project_templates
  # recreate
  HYGEN_OVERWRITE=1 npx hygen {{ version }} new {{ name }} --docker

# generate express project version; express,express20
generate-express name version:
  #!/usr/bin/env bash
  set -xeufo pipefail
  cd 00_project_templates
  # recreate express with node20
  HYGEN_OVERWRITE=1 npx hygen {{ version }} new {{ name }} --docker

# generate express tsoa
generate-tsoa name version="express_tsoa20":
  #!/usr/bin/env bash
  set -xeufo pipefail
  cd 00_project_templates
  # recreate express with node20
  HYGEN_OVERWRITE=1 npx hygen {{ version }} new {{ name }} --docker

# generate package
generate-package name version="package20_cjs_esm":
  #!/usr/bin/env bash
  set -xeufo pipefail
  cd 00_project_templates
  # recreate express with node20
  HYGEN_OVERWRITE=1 npx hygen {{ version }} new {{ name }}
