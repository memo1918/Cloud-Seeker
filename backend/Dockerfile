# build: docker build -t cloud-seeker/backend:latest .
# run:   docker run --name cloud-seeker-backend -d -p 8080:80 cloud-seeker/backend

FROM node:18.16.0-alpine

EXPOSE 3000

WORKDIR /app/build

COPY . /app/build

RUN npm install

RUN npm run build

RUN cp -a /app/build/build/webpack/. /app/deploy/

WORKDIR /app

RUN npx rimraf build

WORKDIR /app/deploy/

ENTRYPOINT ["node", "index.mjs"]