# Use an official lightweight Node.js image as the base
FROM --platform=linux/x86_64 node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the zipped build artifacts into the container
COPY nextjs-build.zip /app

# Install unzip utility, unzip the artifact, and remove the zip file to save space
RUN apk add --no-cache unzip && \
    unzip nextjs-build.zip && \
    rm nextjs-build.zip

# After unzipping
WORKDIR /app/nextjs-build

# Expose port 3000 to be accessible from the outside
EXPOSE 3000

# Run the development server
CMD ["npm", "start"]
