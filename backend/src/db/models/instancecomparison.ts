import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";
import { Category } from "../../interfaces/category.interface";
import { InstanceComparison } from "../../interfaces/instancecomparison.interface";
import { btoa } from "buffer";

export interface IInstanceComparison extends WithId<Document>, InstanceComparison {}

const dbName = "cloud-seeker";
const collectionName = "instancecomparison";

export async function getAllInstanceComparisons(client: MongoClient) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    return (await instanceComparisonCollection.find({}).toArray()) as any[] as Category[];
}

export async function addOneInstanceComparison(client: MongoClient, instanceComparison: Partial<IInstanceComparison>) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.insertOne(instanceComparison);
    return;
}

export async function dropInstanceComparison(client: MongoClient) {
    return client.db(dbName).dropCollection(collectionName);
}

export async function createInstanceComparisonIndex(client: MongoClient) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.createIndex({ categoryName: 1 });
    await instanceComparisonCollection.createIndex({ skus: 1 });
}

export async function removeInstanceComparison(
    client: MongoClient,
    instanceComparison: { [vendor: string]: string }[]
) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.deleteMany({ $or: [...instanceComparison.map((name) => ({ name }))] });
    return;
}

export async function _findInstanceComparisons(client: MongoClient, categoryname: string) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    return (await instanceComparisonCollection
        .find({ categoryName: { $eq: categoryname } })
        .toArray()) as any as InstanceComparison[];
}

export async function _findInstanceCompareSkus(client: MongoClient, skusArray: string[][]) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);

    const orCondition = skusArray.map((innerArray) => ({ skus: innerArray }));

    const matchStage = { $match: { $or: orCondition } };

    const agg = [matchStage];

    const results = await instanceComparisonCollection.aggregate(agg).toArray();
    let map = new Map();
    const getKey = (instance: string[]) => instance.map(btoa).join(",");

    for (let result of results) {
        map.set(getKey(result.skus), result);
    }

    return skusArray.map((i) => map.get(getKey(i)));
}
