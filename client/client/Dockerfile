FROM node:16-alpine

# Add the following lines has to be added for react apps
#https://github.com/facebook/create-react-app/issues/8688
#https://github.com/facebook/create-react-app/issues/11779


ENV CI=true
ENV WDS_SOCKET_PORT=0


WORKDIR /app
COPY package.json ./
RUN npm install

COPY ./ ./

CMD ["npm","start"]

