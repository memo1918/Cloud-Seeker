# build: docker build -t cloud-seeker/frontend:latest .
# run:   docker run --name cloud-seeker-frontend -d -p 8080:80 cloud-seeker/frontend
FROM node:18.16.0-alpine

WORKDIR /app/build

COPY . /app/build

RUN npm install

RUN npm run build

RUN cp -a /app/build/dist/frontend/. /app/deploy

RUN npx rimraf build

FROM nginx
COPY --from=0 /app/deploy/. /usr/share/nginx/html
