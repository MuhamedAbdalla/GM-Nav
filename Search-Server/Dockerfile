FROM node:12.10.0-alpine

WORKDIR /usr/search

COPY package*.json ./
RUN npm ci -qy
RUN npm install

COPY . .

EXPOSE 7070

CMD ["npm", "start"]