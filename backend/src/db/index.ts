import { MongoClient, ServerApiVersion } from "mongodb";

let uri = "";

export function setURI(newUri: string) {
    uri = newUri;
}

async function createMongoClient() {
    if (!uri) {
        return Promise.reject(new Error("[ENV] DB_CONNECTION_STRING missing"));
    }
    try {
        return new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                deprecationErrors: true
            },
            connectTimeoutMS: 200,
            serverSelectionTimeoutMS: 200
        }).connect();
    } catch (e) {
        throw e;
    }
}

export async function execQuery<T>(command: (client: MongoClient) => Promise<T>) {
    const clientPromise: Promise<MongoClient> = createMongoClient();
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
