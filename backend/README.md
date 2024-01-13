# Environment variables

-   `CATEGORY_TEMPLATES` - Path to the templates folder (default: `""`)
-   `DUMMY_DATA_URL` - URL to the dummy data (default: `""`)
    -   if `DUMMY_DATA_URL` is not set, the `INFRACOST_API_KEY` is required as it will be used to fetch the dummy data
        from the infracost API
-   `DB_CONNECTION_STRING` - Connection string to the mongodb database (default: `""`) required
-   `DUMMY_CSV_IMPORT` - Path to the dummy csv file (default: `""`)
-   `INFRACOST_API_KEY` - API key for the infracost API (default: `""`)

# Running the backend

## Running locally

1. Install the dependencies with `npm install`
2. Start the developement environment with the script `start-dev-env-backend.ps1` inside the `devcontainer` folder
3. Run the backend with `npm run start` or `npm run watch` (for development with hot reloading)
4. The backend will be available at `http://localhost:3000` or `http://localhost:8080/api` when using the dev
   environment which proxies the requests to the backend

In WebStorm you can run the backend with the `start-backend` and `watch-backend` run configurations.

## Running in docker

Use the `docker-compose.yml` file inside the root folder to start the whole application with `docker-compose up -d`
This will start the backend, frontend and the database as well as the dummy data container and a reverse proxy for the
frontend and backend.

# Testing

We are using jest as our test runner. The tests are located in the `tests` folder.
The configuration is located in the `jest.config.js` file.
We write a test for each file in the `src` folder. The test file has the same name as the file it is testing but with
the `.test.ts` extension.
Example: `src/api.ts` -> `src/api.test.ts`
We are using the `mongodb-memory-server` package to provide a in memory database for the tests if needed.
Other dependencies to other modules should get mocked in order to not have to rely on the implementation of the other
module.
The tests should be written in a way that they are independent of each other and can be run in parallel.
Shared setup mocking code should be places in the `setups` folder.

In WebStorm you can run the tests with the `test-backend` run configuration.

## Running the tests

1. Install the dependencies with `npm install`
2. Run the tests with `npm run test` This will run the tests.

-   The coverage report will be available in the `build/coverage` folder.
-   The test results will be available in the `build/tests` folder.

# prettier

We are using prettier to format our code. The configuration is located in the `.prettierrc` file.
We can check if the code is formatted correctly with `npm run checkformat` and format the code with `npm run format`.
We recommend to use the prettier extension for your editor to format the code on save.
The formatting will get checked in the CI pipeline and will warn if the code is not formatted correctly.

In WebStorm you can format the code with the `format-backend` run configuration.

# building the backend

We are using webpack to build the backend. The configuration is located in the `webpack.prod.config.js` file.
The build will be available in the `build/webpack` folder.
Paths starting with `test` will be excluded from the build.
The output is a single file that can be run with `node build/webpack/index.mjs`.
License information of used packages will be available in the `build/webpack/index.mjs.LICENSE.txt` file.

# Project structure

The project is structured in the following way:

-   `src` - Source code of the backend
    -   `businesslayer` - Business logic of the backend mostly related to the database
    -   `categories` - Category specific code
    -   `csvimport` - Code related to the csv import
    -   `db` - Code related to the database (mongodb)
        -   `models` - Database models (categories, instancecomparisons, services, websitevisits)
    -   `express` - Code related to the express server
    -   `infracost` - Code related to the infracost API mostly for downloading the dummy data
    -   `interfaces` - Interfaces used in the backend
    -   `mappingservice` - Code related to the mapping service that maps the csv data to a instance comparison
    -   `providerapi` - Code related to the provider API (AWS, Azure, GCP) (not implemented yet)
    -   `routing` - Code related to the routing of the express server
        -   `routes` - Routes of the express server
-   `tests` - Tests for the backend
-   `build` - Build output
    -   `coverage` - Coverage report
    -   `tests` - Test results
    -   `webpack` - Build output of the webpack build
-   `setups` - Shared setup code for the tests

# configuration-files

In this section we will explain how to create configuration files for the backend.

## category-templates

TODO: explain how to create category templates and how to use them
Set the file via the `CATEGORY_TEMPLATES` environment variable.

## csv-mapping-files

TODO: explain how to create csv mapping files
Set the file via the `DUMMY_CSV_IMPORT` environment variable.
