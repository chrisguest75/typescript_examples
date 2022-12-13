#!/usr/bin/env bash
set -euf -o pipefail

readonly SCRIPT_NAME=$(basename "$0")
readonly SCRIPT_PATH=${0}
# shellcheck disable=SC2034
readonly SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

function help() {
    cat <<- EOF
usage: $SCRIPT_NAME options

OPTIONS:
    -c --commit=[commits file]
    -i --ignore=[dockerignore file]

    -h --help -?               show this help

Examples:
    $SCRIPT_NAME --help 

EOF
}

_IMAGENAME=30_commit_trigger_checker
_DOCKERIGNORE=""
_COMMITS=""
for i in "$@"
do
case $i in
    -h|--help)
        help
        exit 2
    ;;
    -i=*|--ignore=*)
        _DOCKERIGNORE="${i#*=}"
        shift # past argument=value
    ;;      
    -c=*|--commits=*)
        _COMMITS="${i#*=}"
        shift # past argument=value
    ;;      
esac
done    

if [[ -z "${_COMMITS}" ]]; then 
    >&2 echo "Commits file not specified, specify --help"
    exit 2
fi
if [[ -z "${_DOCKERIGNORE}" ]]; then 
    >&2 echo "Docker ignore file not specified, specify --help"
    exit 2
fi
if [[ ! -f "${_COMMITS}" ]]; then 
    >&2 echo "Commits file does not exist, specify --help"
    exit 2
fi
if [[ ! -f "${_DOCKERIGNORE}" ]]; then 
    >&2 echo "Docker ignore does not exist, specify --help"
    exit 2
fi

# do work here
# run with filter
_CONTAINERID=$(docker create --rm -it ${_IMAGENAME} /work/commits.txt /work/.dockerignore)
docker cp "${_COMMITS}" "${_CONTAINERID}:/work/commits.txt"
docker cp "${_DOCKERIGNORE}" "${_CONTAINERID}:/work/.dockerignore"
# execute
docker start -ai "${_CONTAINERID}"
exit $?
