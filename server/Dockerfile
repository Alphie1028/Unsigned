FROM node:bullseye

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

COPY ./db/schema.sql /docker-entrypoint-initdb.d/
COPY ./db/seeds.sql /docker-entrypoint-initdb.d/