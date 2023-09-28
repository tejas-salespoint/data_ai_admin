# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy all project files to the working directory
COPY . .

# Build the production-ready version of your Vite React app
RUN npm run build

# Expose the port your app will run on (Vite default: 3000)
EXPOSE 8000

# Start your Vite React app
CMD ["npm", "run", "dev"]
