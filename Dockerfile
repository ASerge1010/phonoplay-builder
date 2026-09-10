FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate --config=prisma7.config.ts

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --config=prisma7.config.ts && npm start"]