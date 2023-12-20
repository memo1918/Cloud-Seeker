import { MongoClient } from "mongodb";

// this function gets a collection from the database
// it is used by other functions in the database module
export async function getCollection(client: MongoClient, db: string, collection: string) {
    return client.db(db).collection(collection);
}
