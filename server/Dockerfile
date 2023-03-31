FROM node:bullseye

WORKDIR /app

COPY . /app

//RUN npm install -g nodemon
RUN npm install
//RUN npm run migrate 
//RUN npm run seed

EXPOSE 3000

CMD ["npm", "start"]