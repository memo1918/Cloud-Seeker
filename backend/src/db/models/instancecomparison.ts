import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";
import { Category } from "../../interfaces/category.interface";
import { InstanceComparison } from "../../interfaces/instancecomparison.interface";

export interface IInstanceComparison extends WithId<Document>, InstanceComparison {}

// this is the name of the database and collection
const dbName = "cloud-seeker";
const collectionName = "instancecomparison";

// this function finds all instance comparisons
export async function getAllInstanceComparisons(client: MongoClient) {
    // get the collection from the database and return all instance comparisons
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    return (await instanceComparisonCollection.find({}).toArray()) as any[] as Category[];
}

// this function adds one instance comparison to the database
export async function addOneInstanceComparison(client: MongoClient, instanceComparison: Partial<IInstanceComparison>) {
    // get the collection from the database and insert the instance comparison supplied
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.insertOne(instanceComparison);
    return;
}

// this function drops the instance comparison collection
export async function dropInstanceComparison(client: MongoClient) {
    return client.db(dbName).dropCollection(collectionName);
}

// this function creates the indexes for the instance comparison collection
export async function createInstanceComparisonIndex(client: MongoClient) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.createIndex({ categoryName: 1 });
    await instanceComparisonCollection.createIndex({ skus: 1 });
}

// this function removes instance comparisons by name from the database
export async function removeInstanceComparison(
    client: MongoClient,
    instanceComparison: { [vendor: string]: string }[]
) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    // delete all instance comparisons that match the names supplied in the instance comparison array by using the $or operator
    await instanceComparisonCollection.deleteMany({ $or: [...instanceComparison.map((name) => ({ name }))] });
    return;
}

// this function finds instance comparisons by category name
export async function _findInstanceComparisons(client: MongoClient, categoryname: string) {
    // get the collection from the database and return all instance comparisons that match the category name
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    return (await instanceComparisonCollection
        // find all instance comparisons that match the category name
        .find({ categoryName: { $eq: categoryname } })
        .toArray()) as any as InstanceComparison[];
}

// this function finds instance comparisons by skus
export async function findInstanceCompareSkus(client: MongoClient, skus: string[][]) {
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
