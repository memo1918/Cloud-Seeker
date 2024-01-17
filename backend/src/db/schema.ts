import { MongoClient } from "mongodb";

// this function gets a collection from the database
// it is used by other functions in the database module
/**
 * this function gets a collection from the database
 * it is used by other functions in the database module
 * @param client the client to use to connect to the database
 * @param db the database name
 * @param collection the collection name
 * @returns {Promise<Collection>} the collection
 */
export async function getCollection(client: MongoClient, db: string, collection: string) {
    return client.db(db).collection(collection);
}
