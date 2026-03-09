FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# El puerto del monolito es 3000
EXPOSE 3000

CMD ["node", "index.js"]
