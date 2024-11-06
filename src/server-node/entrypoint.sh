#!/bin/bash

CONFIG_JSON=$(cat /app/config.json)

export DB_USER=$(echo $CONFIG_JSON | jq -r '.database.user')
export DB_PASSWORD=$(echo $CONFIG_JSON | jq -r '.database.password')
export DB_HOST=$(echo $CONFIG_JSON | jq -r '.database.host')
export DB_PORT=$(echo $CONFIG_JSON | jq -r '.database.port')
export DB_NAME=$(echo $CONFIG_JSON | jq -r '.database.database')
export SERVER_PORT=$(echo $CONFIG_JSON | jq -r '.server.port')

exec "$@"
