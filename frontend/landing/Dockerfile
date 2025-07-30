
# FROM node:20-bullseye
FROM node:20-alpine 

WORKDIR /app

COPY package*.json ./

# 👇 Forcing dev mode
ENV NODE_ENV=development

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
