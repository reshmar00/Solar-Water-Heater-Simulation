# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Specify the command to run on container start
CMD [ "node", "your-main-file.js" ]

