FROM node:alpine 
WORKDIR /
# COPY package*.json ./


RUN npm install express node-id3
COPY . .

EXPOSE 3001
CMD [ "node", "dev-server.js" ]
