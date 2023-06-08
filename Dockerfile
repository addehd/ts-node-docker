# Use the node:16-slim base image
FROM node:16-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Add pnpm package manager globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN pnpm install

# Copy the source code to the container
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Start a new stage for the runtime
FROM node:16-slim 

# Set the working directory
WORKDIR /usr/src/app

# Copy the necessary built files and runtime dependencies from the previous stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# Expose the port the app runs on
EXPOSE 3011

# Start the app
CMD [ "node", "dist/index.js" ]