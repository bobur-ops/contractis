FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN apk add npm

# Copy app source code
COPY . .

ARG FRONTEND_PORT
EXPOSE $FRONTEND_PORT
