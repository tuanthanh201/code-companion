FROM node:18-alpine3.17 as build

WORKDIR /client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 49200

CMD ["npm", "run", "dev"]
