import { MongoClient, ServerApiVersion } from "mongodb";

// the uri used to connect to the database it is used in the execQuery function to connect to the database
let uri = "";

// this function sets the uri used to connect to the database
export function setURI(newUri: string) {
    uri = newUri;
}

// this function creates a mongo client and connects to the database
async function createMongoClient(timeout_ms: number) {
    // if the uri is not set throw an error
    if (!uri) {
        return Promise.reject(new Error("[ENV] DB_CONNECTION_STRING missing"));
    }
    try {
        // create a new mongo client and connect to the database
        return new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                deprecationErrors: false
            },
            // timeout is configurable because of the docker container
            // it is set to 100ms by default
            connectTimeoutMS: timeout_ms,
            serverSelectionTimeoutMS: timeout_ms
        }).connect();
    } catch (e) {
        throw e;
    }
}

// this function executes a query on the database
// it takes a function that takes a mongo client and returns a promise
// the result of the promise is returned by the execQuery function
// the mongo client is closed after the promise is resolved or rejected
// optionally a timeout can be specified in milliseconds
export async function execQuery<T>(command: (client: MongoClient) => Promise<T>, timeout_ms = 100) {
    // create a promise that resolves with the mongo client after a connection is established
    const clientPromise: Promise<MongoClient> = createMongoClient(timeout_ms);
    let client: MongoClient | null = null;
    try {
        // wait for the client to connect to the database
        client = await clientPromise;
        return await command(client);
    } catch (reason) {
        // an unknown error has occurred
        throw reason;
    } finally {
        // close the client if it is not null
        // this is done in a finally block to make sure the client is closed even if an error occurs
        if (client) {
            await client.close();
        }
    }
}

// wrapper for the setURI function
export function setupDB(uri = "") {
    setURI(uri);
}

// this function waits for the database to be available after a restart
// it tries to connect to the database every second until it is available
// it does this by executing a ping command on the admin database
export async function waitForDB() {
    let available = false;
    while (!available) {
        try {
            await execQuery<void>(async (client) => {
                try {
                    // try to execute a ping command on the admin database
                    await client.db("admin").command({ ping: 1 });
                    available = true;
                } catch (e) {
                    // if an error occurs, the database is not available
                    console.log({ message: "no connection available. retrying...." });
                }
            }, 1000);
        } catch (e) {
            console.log({ message: "no connection available. retrying...." });
        }
    }
}
