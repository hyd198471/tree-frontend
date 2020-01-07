FROM node:12.14.0-alpine3.11
RUN mkdir -p /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --slient
RUN npm install react-script -g --slient

CMD ["npm","start"]