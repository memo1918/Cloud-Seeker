# build: docker build -t cloud-seeker/backend:latest .
# run:   docker run --name cloud-seeker-backend -d -p 8080:80 cloud-seeker/backend

FROM node:18.16.0-alpine

WORKDIR /app

COPY ./build/webpack/* /app

EXPOSE 3000

ENTRYPOINT ["node", "index.mjs"]