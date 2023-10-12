import { MongoClient, ServerApiVersion } from "mongodb";
// Replace the placeholder with your Atlas connection string
const uri: string = process.env["DB_CONNECTION_STRING"] ? process.env["DB_CONNECTION_STRING"] : "";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
let connected = false;

export function connectClient(timeout_ms = 2000) {
    return new Promise<MongoClient>(async (resolve, reject) => {
        let exit = false;
        let timeout = setTimeout(() => {
            reject(new Error("Could not connect to db."));
            exit = true;
        }, timeout_ms);
        while (!connected || exit) {
            await run();
        }
        if (!exit) {
            clearTimeout(timeout);
            resolve(client);
        }
    });
}

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        connected = true;
    } catch (err) {
        // Ensures that the client will close when you finish/error
        await client.close();
        connected = false;
    }
}

export async function disconnectClient() {
    connected = false;
    await client.close();
}
