import { MongoClient, ServerApiVersion } from "mongodb";

let uri = "";

export function setURI(newUri: string) {
    nextClient?.then((c) => c.close()).catch(console.error);
    uri = newUri;
    nextClient = createMongoClient();
}

function createMongoClient() {
    return new Promise<MongoClient>((resolve, reject) => {
        let resolveError: ((reason: any) => void) | null = null;
        let resolveResult: ((client: MongoClient) => void) | null = null;
        let result: Promise<MongoClient> = new Promise<MongoClient>((resolve) => (resolveResult = resolve));
        let error: Promise<any> = new Promise<any>((reason) => (resolveError = reason));
        setImmediate(() => {
            try {
                if (!uri) {
                    if (resolveError) resolveError(new Error("[ENV] DB_CONNECTION_STRING missing"));
                } else
                    new MongoClient(uri, {
                        serverApi: {
                            version: ServerApiVersion.v1,
                            strict: true,
                            deprecationErrors: true
                        },
                        connectTimeoutMS: 200,
                        serverSelectionTimeoutMS: 200
                    })
                        .connect()
                        .then((_client) => {
                            if (resolveResult) resolveResult(_client);
                        })
                        .catch((reason) => {
                            if (resolveError) resolveError(reason);
                        });
            } catch (reason) {
                if (resolveError) {
                    resolveError(reason);
                }
            }

            Promise.race([result, error])
                .then(resolve)
                .catch(reject);
        });
    });
}

let nextClient: Promise<MongoClient>;

export async function execQuery(command: (client: MongoClient) => Promise<void>) {
    const clientPromise: Promise<MongoClient> = nextClient;
    nextClient = createMongoClient();
    let client: MongoClient | null = null;
    try {
        client = await clientPromise;
        await command(client);
    } finally {
        if (client) {
            await client.close();
        }
    }
}
