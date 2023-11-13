import { execQuery } from "../db";
import { getCollection } from "../db/schema";
import { collectionName, dbName } from "../db/models/services";

export async function shouldimportdump(): Promise<boolean> {
    return execQuery<boolean>(async (client) => {
        let collection = await getCollection(client, dbName, collectionName);
        let count = await collection.countDocuments();
        return count == 0;
    }, 20000);
}
