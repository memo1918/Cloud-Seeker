# build: docker build -t cloud-seeker/frontend:latest .
# run:   docker run --name cloud-seeker-frontend -d -p 8080:80 cloud-seeker/frontend


FROM nginx
COPY ./dist/frontend/* /usr/share/nginx/html
