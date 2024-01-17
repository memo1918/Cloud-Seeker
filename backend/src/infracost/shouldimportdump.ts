import { execQuery } from "../db";
import { getCollection } from "../db/schema";
import { collectionName, dbName } from "../db/models/services";

/**
 * this function checks if the dump should be imported
 * it returns a promise that resolves to a boolean
 * true if the dump should be imported
 * false if the dump should not be imported
 * it checks if the services collection is empty
 * if the collection is empty the dump should be imported
 * if the collection is not empty the dump should not be imported
 * @returns {Promise<boolean>} a promise that resolves to a boolean
 */
export async function shouldimportdump(): Promise<boolean> {
    return execQuery<boolean>(async (client) => {
        // get the services collection
        let collection = await getCollection(client, dbName, collectionName);
        // count the number of documents in the collection
        let count = await collection.countDocuments();
        // return true if the collection is empty
        return count == 0;
    }, 20000);
}
