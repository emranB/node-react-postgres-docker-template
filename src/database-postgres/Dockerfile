FROM postgres:latest

COPY ./config.json /config/config.json
COPY src/entrypoint.sh /docker-entrypoint-initdb.d/entrypoint.sh
COPY src/init.sql /docker-entrypoint-initdb.d/

RUN apt-get update && apt-get install -y jq
RUN chmod +x /docker-entrypoint-initdb.d/entrypoint.sh

EXPOSE 5432
