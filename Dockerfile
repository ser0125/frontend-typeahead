FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm","start"]
