FROM node:6.5.0

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY . /app
RUN npm install
RUN npm rebuild node-sass

# Wait for it
COPY wait-for-it.sh /wait-for-it.sh
COPY docker.env /app/docker.env
RUN chmod +x /wait-for-it.sh

# Mount persistent storage
# VOLUME /app/data
# VOLUME /app/public/uploads

EXPOSE 3000
CMD [ "npm", "start" ]