import { MongoClient, ServerApiVersion } from "mongodb";

let uri = "";

export function setURI(newUri: string) {
    uri = newUri;
}

async function createMongoClient(timeout_ms: number) {
    if (!uri) {
        return Promise.reject(new Error("[ENV] DB_CONNECTION_STRING missing"));
    }
    try {
        return new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                deprecationErrors: false
            },
            connectTimeoutMS: timeout_ms,
            serverSelectionTimeoutMS: timeout_ms
        }).connect();
    } catch (e) {
        throw e;
    }
}

export async function execQuery<T>(command: (client: MongoClient) => Promise<T>, timeout_ms = 100) {
    const clientPromise: Promise<MongoClient> = createMongoClient(timeout_ms);
    let client: MongoClient | null = null;
    try {
        client = await clientPromise;
        return await command(client);
    } catch (reason) {
        throw reason;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

export function setupDB(uri = "mongodb://localhost:27017") {
    setURI(uri);
}

export async function waitForDB() {
    let available = false;
    while (!available) {
        try {
            await execQuery<void>(async (client) => {
                try {
                    await client.db("admin").command({ ping: 1 });
                    available = true;
                } catch (e) {
                    console.log({ message: "no connection available. retrying...." });
                }
            }, 1000);
        } catch (e) {
            console.log({ message: "no connection available. retrying...." });
        }
    }
}
