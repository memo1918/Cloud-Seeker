import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";
import { Category } from "../../interfaces/category.interface";
import { InstanceComparison } from "../../interfaces/instancecomparison.interface";

export interface IInstanceComparison extends WithId<Document>, InstanceComparison {
}

/**
 * this is the name of the database and collection
 */
const dbName = "cloud-seeker";
/**
 * this is the name of the database and collection
 */
const collectionName = "instancecomparison";

/**
 * this function finds all instance comparisons in the database
 * @param client the client to use to connect to the database
 *
 * @returns {Promise<Category[]>} all instance comparisons
 */
export async function getAllInstanceComparisons(client: MongoClient): Promise<Category[]> {
    // get the collection from the database and return all instance comparisons
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    return (await instanceComparisonCollection.find({}).toArray()) as any[] as Category[];
}

/**
 * this function adds one instance comparison to the database
 * @param client the client to use to connect to the database
 * @param instanceComparison the instance comparison to add
 *
 * @returns {Promise<void>} nothing
 */
export async function addOneInstanceComparison(client: MongoClient, instanceComparison: Partial<IInstanceComparison>): Promise<void> {
    // get the collection from the database and insert the instance comparison supplied
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.insertOne(instanceComparison);
    return;
}

/**
 * this function drops the instance comparison collection from the database
 * @param client the client to use to connect to the database
 *
 * @returns {Promise<boolean>} true if the collection was dropped, false otherwise
 */
export async function dropInstanceComparison(client: MongoClient) {
    return client.db(dbName).dropCollection(collectionName);
}

/**
 * this function creates the indexes for the instance comparison collection
 *
 * indices created:
 * - categoryName: 1
 * - skus: 1
 *
 * @param client the client to use to connect to the database
 * @returns {Promise<void>} nothing
 */
export async function createInstanceComparisonIndex(client: MongoClient) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.createIndex({ categoryName: 1 });
    await instanceComparisonCollection.createIndex({ skus: 1 });
}

/**
 * this function removes instance comparisons by name from the database
 * @param client the client to use to connect to the database
 * @param instanceComparison the instance comparisons to remove
 * @returns {Promise<void>} nothing
 */
export async function removeInstanceComparison(
    client: MongoClient,
    instanceComparison: { [vendor: string]: string }[]
) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    // delete all instance comparisons that match the names supplied in the instance comparison array by using the $or operator
    await instanceComparisonCollection.deleteMany({ $or: [...instanceComparison.map((name) => ({ name }))] });
    return;
}

/**
 * this function finds instance comparisons by category name
 * @param client the client to use to connect to the database
 * @param categoryname the name of the category to find the instance comparisons for
 */
export async function _findInstanceComparisons(client: MongoClient, categoryname: string) {
    // get the collection from the database and return all instance comparisons that match the category name
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    return (
        (await instanceComparisonCollection
            // find all instance comparisons that match the category name
            .find({ categoryName: { $eq: categoryname } })
            .toArray()) as any as InstanceComparison[]
    );
}

/**
 * this function finds instance comparisons by skus
 * @param client the client to use to connect to the database
 * @param skus the skus to find the instance comparisons for
 * @returns {Promise<InstanceComparison[]>} the instance comparisons for the given skus
 */
export async function findInstanceCompareSkus(client: MongoClient, skus: string[][]): Promise<InstanceComparison[]> {
    // get the collection from the database and return all instance comparisons that match the skus
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);

    let result = await Promise.all(
        // make a request for each sku
        skus.map(async (i) => {
            return (await instanceComparisonCollection.find({ skus: i }).toArray()) as any[];
        })
    );
    // flatten the result by one level
    return result.flat();
}
