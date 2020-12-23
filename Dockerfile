FROM node:12.10.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci -qy
RUN npm install
RUN wget http://download.redis.io/redis-stable.tar.gz
RUN tar xvzf redis-stable.tar.gz
RUN cd redis-stable

COPY . .

EXPOSE 3000

CMD ["npm", "start"]