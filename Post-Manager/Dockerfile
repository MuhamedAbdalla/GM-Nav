FROM node:12.10.0-alpine

WORKDIR /usr/PostManager

COPY package*.json ./
RUN npm ci -qy
RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]