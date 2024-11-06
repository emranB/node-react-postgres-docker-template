#!/bin/bash

CONFIG_JSON=$(cat /config/config.json)

export POSTGRES_USER=$(echo $CONFIG_JSON | jq -r '.database.user')
export POSTGRES_PASSWORD=$(echo $CONFIG_JSON | jq -r '.database.password')
export POSTGRES_DB=$(echo $CONFIG_JSON | jq -r '.database.database')

exec "$@"
