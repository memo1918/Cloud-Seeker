# Virtual Machine

## Prerequisites

* [docker](https://docs.docker.com/engine/install/)

## Deployment

1. create configuration files for category templates and csv mapping files. (
   see [here](../backend/README.md#configuration-files))
2. create a `docker-compose.yml` file. according to the example below.

```yaml
services:
  cloudseeker-frontend:
    image: cloudseeker/frontend:latest

  cloudseeker-backend:
    image: cloudseeker/backend:latest
    volumes:
      - ./<configuration>:/cloudseeker/configuration # mount into /cloudseeker/configuration
    environment:
      - DB_CONNECTION_STRING=mongodb://mongodb:27017
      - CATEGORY_TEMPLATES=/cloudseeker/configuration/samplecategory.json # file created in step 1
      - DUMMY_CSV_IMPORT=/cloudseeker/configuration/dummycsvimport.csv # file created in step 1
      - DUMMY_DATA_URL=http://dummydata/archive.csv.gz # download from dummydata or other service or use INFRACOST_API_KEY

  reverseproxy:
    image: cloudseeker/reverseproxy:latest
    ports:
      - "8080:80"

  # workaround for serving dummy data
  # serves one static file @ http://dummydata:80/archive.csv.gz
  dummydata:
    image: cloudseeker/dummydata:latest

  mongodb:
    # mongodb should only be needed for a cache on runtime and might not store any persistent data (tbd)
    image: mongo
    volumes:
      - ./devcontainer/mongodb:/data/db
```

3. run `docker compose up -d` to start the application.
4. the application will be available at `http://localhost:8080` (Optional: you can add a proxy layer to enable https.)

# Azure

In order to deploy to Azure you need to have an Azure account and a subscription.

Download and install the azure-cli
from [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

This script follows the example
from [here](https://docs.microsoft.com/en-us/azure/app-service/containers/quickstart-multi-container?tabs=bash).

Additional information can be
found [here](https://learn.microsoft.com/en-us/azure/app-service/configure-custom-container?tabs=debian&pivots=container-linux).

1. Login to your azure account

    ```azurecli
    az login
    ```

2. set the subscription you want to deploy to.

    ```azurecli
    az account set --subscription <subscription-id> # this is the subscription you want to deploy to
    ```

3. this will create a resource group in the specified location.

    ```azurecli
    az group create --name CloudSeekerResourceGroup --location <location> # this creates a resource group in the specified location
    ```

4. this will create a service plan in the specified resource group.

    ```azurecli
    az appservice plan create --name CloudSeekerServicePlan --resource-group CloudSeekerResourceGroup --sku B2 --is-linux # B2 costs money, but is the cheapest option available to run the application
    ```

5. this will create a webapp in the specified resource group and service plan.

   the type of the webapp is set to multicontainer and the docker-compose.yml file is uploaded to the webapp.

   we need a verion of the docker-compose images which does not need files to be mounted to the container.

    ```azurecli
    az webapp create --resource-group CloudSeekerResourceGroup --plan CloudSeekerServicePlan --name <applicationname> --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml # this uploads the docker-compose.yml file to the webapp which then runs the application
    ```

We can use the following docker-compose.yml file to deploy the application to azure.

```yaml
services:
  cloudseeker-frontend:
    image: cloudseeker/frontend:azure

  cloudseeker-backend:
    image: cloudseeker/backend:azure
    environment:
      - DB_CONNECTION_STRING=mongodb://mongodb:27017
      - CATEGORY_TEMPLATES=/cloudseeker/configuration/samplecategory.json # static file in the image
      - DUMMY_CSV_IMPORT=/cloudseeker/configuration/dummycsvimport.csv # static file in the image
      - DUMMY_DATA_URL=http://dummydata/archive.csv.gz # download from dummydata service

  reverseproxy:
    image: cloudseeker/reverseproxy:azure
    ports:
      - "8080:80"

  # workaround for serving dummy data
  # serves one static file @ http://dummydata:80/archive.csv.gz
  dummydata:
    image: cloudseeker/dummydata:azure

  mongodb:
    # mongodb should only be needed for a cache on runtime and might not store any persistent data (tbd)
    image: cloudseeker/db:azure
```

To generate the azure images we need to adjust the docker images so that:

* [BACKEND] configuration files like `categorytemplates` or `csvmappingfiles` are already copied into the image.
* [DUMMYDATA] the `dummydata` image is built and pushed to the registry. according to the readme in the `dummydata`
  directory.
* [MONGO] the mongodb image is built and pushed to the registry. this includes the dummydata so that the backend does
  not need to redownload and push files to database. (this step is only necesarry because the B2 service is not enough
  to run the application. if you have a better service plan you can skip this step)
* [REVERSEPROXY] the reverseproxy image is built and pushed to the registry. (no adjustments needed)
* [FRONTEND] the frontend image is built and pushed to the registry. (no adjustments needed)

**When deploying to a virtual machine we can skip the image adjustments and just use the images from the registry.**

