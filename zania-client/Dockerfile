# Build stage
FROM node:20-alpine as build

# Define build arguments for environment variables
ARG VITE_API_BASE_URL

# Set environment variables during the build process
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL


# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]