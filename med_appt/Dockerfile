# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy the rest of the files
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built files and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the Vite preview port (default: 4173)
EXPOSE 4173

# Start the app in preview mode
CMD ["npm", "run", "preview"]