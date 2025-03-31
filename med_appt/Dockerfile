# Use a Node.js image as the base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vite project
RUN npm run build

# Expose port (depends on your Vite settings)
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview"]
