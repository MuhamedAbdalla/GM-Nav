FROM node:12.10.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci -qy
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]