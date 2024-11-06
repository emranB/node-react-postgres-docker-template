# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first for optimized caching
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the entire src directory into the container and other necessary files
COPY src src
COPY ./config.json /app/config.json
COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./vite.config.js /app/vite.config.js

# Install jq to process JSON files if not already available in the base image
RUN apt-get update && apt-get install -y jq

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose the configured port for the frontend
EXPOSE 5173

# Set the entrypoint script to initialize environment variables
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command to start the Vite preview server
# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "dev"]
