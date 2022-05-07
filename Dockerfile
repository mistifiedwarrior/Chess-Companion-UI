FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install --production --force
RUN npm run build

CMD ["npm", "start"]
