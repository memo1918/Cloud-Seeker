# Cloud Seeker
## Running and building the application

* Open the “cloud-seeker” project in a terminal
* Start “docker engine”
* Run “docker compose up” to pull and run the application from the docker registry.
* Open a browser on localhost:8080 for the frontend
* Open a browser on api.localhost:8080 for the api
* This output should appear after running the commands mentioned above

## Environment
We need the following tools for our environment:

* Google Chrome https://www.google.com/intl/de_de/chrome/
* Git https://git-scm.com/
* WebStorm https://www.jetbrains.com/de-de/webstorm/
* Docker https://www.docker.com/
* node version manager https://github.com/coreybutler/nvm-windows
* node 18.16.0
    * `using node version manager:`
    * `nvm install 18.16.0`
    * `nvm use 18.16.0`
* Angular CLI (after node)
    * `npm i -g @angular/cli`
* MongoDB Compass https://www.mongodb.com/products/tools/compass

We need to clone the repo:

* git clone https://git.it.hs-heilbronn.de/it/courses/seb/pmt/pmt-sose-23/cloud-seeker.git
* use credentials of choice (Token, PW, ….)

## Deployment

Deployment is described in [dokumentation/deployment.md](/dokumentation/deployment.md).


## Continuous Integration and Continuous Delivery
CI/CD is described in [dokumentation/ci_cd.md](/dokumentation/ci_cd.md).

## Configuring the application
Configuring the application is described in [dokumentation/configuring_the_application.md](/dokumentation/configuring_the_application.md).

## Operation instructions
Operation instructions are described in [dokumentation/operation_instructions.md](/dokumentation/operation_instructions.md).

## Writing tests
Writing tests are described in [dokumentation/writing_tests.md](/dokumentation/writing_tests.md).