FROM node:alpine

WORKDIR /usr/app

# Copy package.json first - it prevents to rerun $npm install every time when code is changed
COPY ./package.json ./
RUN npm install

COPY ./ ./


CMD ["npm","start"]
