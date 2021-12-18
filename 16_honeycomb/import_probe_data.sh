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
    -p --path                  folder path to scan
    -o --output                path to output probe data
    -h --help -?               show this help

Examples:
    $SCRIPT_NAME --help 

EOF
}

FOLDER=.  

for i in "$@"
do
case $i in
    -h|--help)
        help
        exit 0
    ;; 
    -p=*|--path=*)
        FOLDER="${i#*=}"
        shift # past argument=value
    ;;
esac
done    


find "${FOLDER}" -exec mongoimport -c ffprobe --file {} "mongodb://root:rootpassword@0.0.0.0:27017/ffprobe" --authenticationDatabase admin \; 

