FROM node:23-slim
# FROM node:23-alpine

# ENV NODE_ENV development

WORKDIR /app

# COPY package.json .
COPY package*.json .

RUN npm install 

RUN npm install -g nodemon

COPY . .

CMD [ "npm", "run", "dev"]

EXPOSE 5000