FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN chown -R node:node node_modules

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
