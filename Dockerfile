# Use an official Node.js runtime as the base image
FROM node:18

# Install TeX Live for LaTeX support
RUN apt-get update && \
    apt-get install -y texlive-full && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create and set the working directory
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Set npm to retry and increase timeout
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the desired port
EXPOSE 4000

# Run the application
CMD ["npm", "start"]
