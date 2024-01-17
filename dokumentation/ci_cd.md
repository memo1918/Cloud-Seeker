# Continuous Integration and Continuous Delivery

In the following we describe how we use GitLab CI/CD to automate the build, test, and delivery of the application.

## Backend

The configuration defines jobs for testing, building, checking formatting, and generating documentation for the
backend component of the application.

The pipeline is triggered automatically on GitLab whenever there is a new commit to any branch.

Artifacts are collected and stored for certain directories, and test reports and coverage reports are generated for
the `test_backend` job.

**Notes:**

- In each step of this pipeline we use a Docker image with Node.js installed to run the necessary commands. The image
  is `node:18.16.0-bullseye`.
- Before each task is run we change the working directory to the `backend` directory and install the Node.js
  dependencies
  using `npm install`.

### test_backend

We run test for the backend using the `test` script. This script uses `jest` to run the tests and generate a coverage
and a JUnit XML report.

- Stage: `test`
- Script: Runs the backend tests using `npm test`.
- Artifacts:
    - JUnit XML report at `backend/build/tests/junit.xml` and
    - Coverage report in Cobertura format at `backend/build/coverage/cobertura-coverage.xml`.
- Coverage: coverage is parsed from the Cobertura report in the console and displayed in the pipeline UI.

### build_backend

We build the backend using the `build` script. This script uses `webpack` to build the backend code and store the output
in the `backend/build/` directory.

- Stage: `build`
- Script: Builds the backend using `npm run build`.
- Artifacts:
    - the build output is stored in the  `backend/build/` directory and uploaded as an artifact.

### formatting_backend

We use the `checkformat` script to check the formatting of the backend code. This script uses `prettier` to check the
formatting of the backend code. If the code is not formatted correctly, the script exits with a non-zero exit code,
causing the job to fail. This job is marked as allowed to fail, indicating that it's optional and won't affect the
overall pipeline result if it fails.

- Stage: `test`
- Script: Checks the formatting of the backend code using `npm run checkformat`.
- Allow Failure: This job is allowed to fail without affecting the overall pipeline
  result (`allow_failure: true`). This is because the formatting of the code is not critical to the operation.

### documentation_backend

We use the `docs` script to generate documentation for the backend code. This script uses `typedoc` to generate a
documentation of the code which is stored in the `backend/build/docs/` directory. The documentation can be viewed by
opening the `index.html` file in the `backend/build/docs/` directory.

- Stage: `documentation`
- Script: Generates backend documentation using `npm run docs`.
- Artifacts:
    - The generated documentation in the `backend/build/docs/` directory.

## Frontend

The configuration defines jobs for testing, building, and generating documentation for the frontend component of the
application.

Each job uses the specified Docker image (`atlassianlabs/docker-node-jdk-chrome-firefox:latest`) and changes the working
directory to the `frontend` directory, and installs Node.js dependencies using `npm install`.

### test_frontend

- Stage: `test`
- Script: We run frontend tests using `npm run test-ci`.
- Artifacts:
    - Coverage report in Cobertura format at `frontend/artifacts/coverage/frontend/cobertura-coverage.xml` and
    - JUnit XML reports at `frontend/artifacts/tests/frontend/*.xml`
- Coverage: We extract the coverage from the Cobertura report in the console and display it in the pipeline UI.

### build_frontend

- Stage: `build`
- Script: We build the frontend using `npm run build`. This uses the angular CLI to build the frontend and store the
  output in the `frontend/dist/` directory.
- Artifacts:
    - The build output in the `frontend/dist/**` directory.

### documentation_frontend

- Stage: `documentation`
- Script: We generate frontend documentation using `npm run docs`. This uses `typedoc` to generate a documentation of
  the
  code which is stored in the `frontend/artifacts/docs/` directory. The documentation can be viewed by opening the
  `index.html` file in the `frontend/artifacts/docs/` directory.
- Artifacts:
    - The documentation found in the `frontend/artifacts/docs/**` directory.

## Containerisation

All jobs in this stage are run in the `containerisation` stage.

This automated workflow automates the containerization of different components of an application using Kaniko. It
ensures that container images are built and tagged appropriately, and these images can be deployed with the specified
tags to the Docker image repository. The pipeline is designed to be triggered on specific conditions (Git tag existence)
and depends on the successful completion of preceding jobs for each component.

### Triggering the containerization pipeline

The pipeline is triggered automatically on GitLab whenever there is a Git tag (`$CI_COMMIT_TAG != null`), indicating a
version release.
A tag is created when a new version of the application is released. The tag name is the version number of the release.
e.g. `beta-1.0.0`.

### containerise-frontend

We use Kaniko to build a Docker image for the frontend component of the application.

* Dependencies: Depends on the success of "build_frontend" and "test_frontend" jobs.
* Script: Uses Kaniko to build a Docker image for the frontend component.
* Output: Docker image tagged with the commit tag and "latest" in [https://hub.docker.com/repository/docker/cloudseeker/frontend](https://hub.docker.com/repository/docker/cloudseeker/frontend)

### containerise-backend

We use Kaniko to build a Docker image for the backend component of the application.

* Dependencies: Depends on the success of "build_backend" and "test_backend" jobs.
* Script: Uses Kaniko to build a Docker image for the backend component.
* Output: Docker image tagged with the commit tag and "latest" in [https://hub.docker.com/repository/docker/cloudseeker/backend](https://hub.docker.com/repository/docker/cloudseeker/frontend)

### containerise-reverseproxy

We use Kaniko to build a Docker image for the reverse proxy component of the application.

* Dependencies: No explicit dependencies.
* Script: Uses Kaniko to build a Docker image for the reverse proxy component.
* Output: Docker image tagged with the commit tag and "latest" in [https://hub.docker.com/repository/docker/cloudseeker/reverseproxy](https://hub.docker.com/repository/docker/cloudseeker/frontend)

### Pipeline output

The primary output of this pipeline is a set of Docker images for the frontend, backend, and reverse proxy components,
each tagged with the commit tag and "latest."
These Docker images are pushed to the specified Docker image repository [https://hub.docker.com/repository/docker/cloudseeker](https://hub.docker.com/repository/docker/cloudseeker)

## C4 Models

We write C4 models in PlantUML and use the PlantUML Docker image to generate diagrams from the PlantUML files. The
generated diagrams are stored as artifacts for further use or distribution.

We use `ghcr.io/plantuml/plantuml` as the Docker image for this job.

### plantuml

- Stage: documentation
- Script: Executes the following script:
    - `java -jar /opt/plantuml.jar -o output ./diagrams/**.puml`
        - This command uses the PlantUML JAR file (`plantuml.jar`) to process PlantUML files (`**.puml`) located in
          the `./diagrams/` directory.
        - The generated diagrams are placed in the `output` directory.
        - The file is named after the PlantUML title, with the extension changed to `.png`.
        - e.g.: the following diagram will generate a file named Example_Diagram.png in the output directory.
          ```puml
          @startuml Example_Diagram
          @enduml
          ```
- Artifacts:
    - We include the generated images which match the glob pattern: `diagrams/output/*.png`.
