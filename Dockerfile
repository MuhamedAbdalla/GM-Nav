FROM node:12.10.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci -qy
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]