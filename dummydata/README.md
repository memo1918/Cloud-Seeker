# Instructions for downloading a new dump

## Downloading a dump from infracost

1. get your api key from infracost
2. use this api key to get the download url:

  ```bash
  curl --location 'https://pricing.api.infracost.io/data-download/latest' \
  --header 'X-Api-Key: <<infracost_api_key>>'
  ```

3. download the file specified in downloadUrl
4. rename that file to `archive.csv.gz`
5. place the new `archive.csv.gz` in the `dummydata` directory

## File structure

* dummydata
    * archive.csv.gz
    * Dockerfile
    * docker-compose.yml
    * README.md
    * nginx
        * nginx.conf