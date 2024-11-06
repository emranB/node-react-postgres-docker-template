docker \
    system \
    prune \
    -y

docker-compose \
    -f docker-compose.yml \
    down

docker-compose \
    -f docker-compose.yml \
    up \
    --build