#!/bin/bash

# Load configuration from config.json using jq
CONFIG_JSON=$(cat /app/config.json)

# Export environment variables for the API server host and port
export REACT_APP_API_HOST=$(echo $CONFIG_JSON | jq -r '.api.host')
export REACT_APP_API_PORT=$(echo $CONFIG_JSON | jq -r '.api.port')

# Execute the passed command
exec "$@"
