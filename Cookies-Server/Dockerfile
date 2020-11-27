FROM node:12.10.0-alpine

WORKDIR /usr/cookies

COPY package*.json ./
RUN npm ci -qy
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]