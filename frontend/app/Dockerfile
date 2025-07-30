# frontend/app/Dockerfile
# FROM node:20-alpine
FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
# EXPOSE 5173