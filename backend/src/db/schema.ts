import { MongoClient } from "mongodb";

export async function getCollection(client: MongoClient, db: string, collection: string) {
    return client.db(db).createCollection(collection);
}