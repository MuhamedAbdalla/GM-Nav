FROM node:12.10.0-alpine

WORKDIR /usr/Cache

COPY package*.json ./
RUN npm ci -qy
RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "start"]