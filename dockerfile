FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env .env

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run seed && node dist/main.js"]



#docker run --network=host --env-file .env open-claw-api