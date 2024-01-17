# Writing tests

## Backend

### Running the tests

1. Install the dependencies of the backend with `npm install`
2. Run the tests with `npm run test` This will run the tests and generate a coverage and test report. (we can also run
   the tests using the `test-backend` run configuration in WebStorm)
    - The coverage report will be available in the `build/coverage` folder.
    - The junit test report will be available in the `build/tests` folder.

### Where to write tests

We are using jest to run the tests. The configuration is located in the `jest.config.js` file.

We write a test for each file in the `src` folder. The test file has the same name as the file it is testing but with
the `.test.ts` extension.

Example: `src/api.ts` -> `test/api.test.ts`

### What are we using to test

We are using the `mongodb-memory-server` package to provide a in memory database for the tests if needed, so that we
don't have to rely on a running database.

We are mocking dependencies to other modules in order to not have to rely on the implementation of the other module.

### How to write tests

The tests should be written in a way that they are independent of each other and can be run in parallel.

We have an exception for the package `mongodb-memory-server` which needs different ports for each test. We increment the
port for each test by using jest shared environment variables.

### Testcases

- The happy path of the function
- The error cases of the function
- The edge cases of the function
- The different code paths of the function (branches)

### How to mock dependencies

We are using the `jest.mock` function to mock dependencies.

Example:

```typescript
import { mocked } from 'ts-jest/utils';
import { someFunction } from '../src/someModule';

jest.mock('../src/someModule');

const mockedSomeFunction = mocked(someFunction, true);

mockedSomeFunction.mockImplementation(() => {
    // mock implementation
});
```

### How to mock the database

We can start the database in the `beforeAll` hook and stop it in the `afterAll` hook.

Start the datatbase:

```typescript
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let counter = 0;

beforeAll(async () => {
   let worker = Number(process.env["JEST_WORKER_ID"]);
    mongoServer = await MongoMemoryServer.create({ instance: { port: 2000 + 100 * worker + counter++ } });
    const mongoUri = await mongoServer.getUri();
   client = await new MongoClient(mongoUri).connect();
    
});
```
