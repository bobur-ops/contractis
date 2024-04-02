FROM node:20-alpine as build-stage

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR usr/src/app

# Set environment variables for build
ARG VITE_API_URL
ARG VITE_SOCKET_HOST
ARG VITE_GOOGLE_MAP_TOKEN

# Install app dependencies
RUN apk update && apk upgrade

# Copy app source code
COPY . /usr/src/app
RUN npm install

# Build app
RUN npm run build

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

EXPOSE 3000

