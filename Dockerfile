# Use an official lightweight Node.js image as the base
FROM --platform=linux/x86_64 node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the build directory and other necessary files
COPY --from=build /github/workspace/node_modules ./node_modules
COPY --from=build /github/workspace/.next ./.next
COPY --from=build /github/workspace/public ./public
COPY --from=build /github/workspace/package.json ./package.json

# Expose port 3000 to be accessible from the outside
EXPOSE 3000

# Run the development server
CMD ["npm", "start"]
