# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the frontend directory contents into the container at /app
COPY frontend/ /app

# Install http-server globally
RUN npm install -g http-server

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run http-server on port 8080
CMD ["http-server", "-p", "8080"]
