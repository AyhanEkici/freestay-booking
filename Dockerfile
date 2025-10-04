# Use Node.js 16 as base image
FROM node:16-alpine

# Set environment variables
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy all backend files
COPY backend/ .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
