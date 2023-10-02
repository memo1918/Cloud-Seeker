FROM node:18.16.0-alpine

WORKDIR /app

COPY ./build/webpack/* /app

EXPOSE 3000

ENTRYPOINT ["node", "index.mjs"]