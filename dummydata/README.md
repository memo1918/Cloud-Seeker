# Instructions for downloading a new dump and creating a new docker image

## Downloading a dump from infracost

1. get your api key from infracost
2. use this api key to get the download url:

```bash
curl --location 'https://pricing.api.infracost.io/data-download/latest' --header 'X-Api-Key: <<infracost_api_key>>'
```

3. download the file specified in downloadUrl
4. rename that file to `archive.csv.gz`
5. place the new `archive.csv.gz` in the `dummydata` directory
6. build the docker image with `docker compose build` (dummydata directory must be the working directory)
7. push the docker image with `docker compose push` (dummydata directory must be the working directory)

## Target file structure

* dummydata
    * archive.csv.gz
    * Dockerfile
    * docker-compose.yml
    * README.md
    * nginx
        * nginx.conf