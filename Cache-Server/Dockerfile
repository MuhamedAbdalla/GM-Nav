FROM node:12.10.0-alpine
FROM redis:6.0.9

WORKDIR /usr/Cache

COPY package*.json ./
RUN npm ci -qy
RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "start"]