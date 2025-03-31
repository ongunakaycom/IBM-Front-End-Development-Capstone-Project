# Use a smaller Node.js Alpine image for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files for dependency installation (better layer caching)
COPY package.json package-lock.json ./

# Install dependencies (clean cache to reduce image size)
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application
COPY . .

# Build the Vite project
RUN npm run build

# Use a separate stage for runtime (smaller final image)
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the Vite preview port (default: 4173)
EXPOSE 4173

# Start the app in preview mode (for production)
CMD ["npm", "run", "preview"]