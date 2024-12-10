# Stage 1: Build
FROM node:18-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++ gcc sqlite-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Create data directory
RUN mkdir -p /app/data

# Expose ports
EXPOSE 5173
EXPOSE 3001

# Start both client and server
CMD ["npm", "run", "dev:full"]