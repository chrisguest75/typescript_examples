#!/bin/bash

echo "REDIS_HOSTNAME=$REDIS_HOSTNAME"
if [ -z $REDIS_HOSTNAME ]
then
    echo "REDIS_HOSTNAME environment variable not set"
    exit 1
fi 

while true; do
    CURRENT=$(redis-cli -h "$REDIS_HOSTNAME" GET datetime)
    echo "DATE_WITH_TIME=$CURRENT"
    DATE_WITH_TIME=$(date "+%Y%m%d-%H%M%S")
    redis-cli -h "$REDIS_HOSTNAME" SET datetime "$DATE_WITH_TIME" 
    sleep 20
done