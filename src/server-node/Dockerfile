FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies (including cors)
COPY ./package*.json ./
RUN npm install

# Copy the rest of the application code
COPY src . 
COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./config.json /app/config.json

# Install jq for JSON processing and make entrypoint executable
RUN apt-get update && apt-get install -y jq
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

# Set entrypoint and default command to start the server
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "index.js"]
