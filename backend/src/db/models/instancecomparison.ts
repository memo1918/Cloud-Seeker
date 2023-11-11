import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";
import { ICategory } from "./categories";

export interface IInstanceComparison extends WithId<Document> {
    name: string;
    price: {};
    fields: {};
    skus: string[];
}

const dbName = "cloud-seeker";
const collectionName = "instancecomparison";

export async function getAllInstanceComparisons(client: MongoClient) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    return (await instanceComparisonCollection.find({}).toArray()) as ICategory[];
}

export async function addOneInstanceComparison(client: MongoClient, instanceComparison: Partial<IInstanceComparison>) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.insertOne(instanceComparison);
    return;
}

export async function dropInstanceComparion(client: MongoClient) {
    return client.db(dbName).dropCollection(collectionName);
}
export async function removeInstanceComparison(client: MongoClient, instanceComparison: string[]) {
    let instanceComparisonCollection = await getCollection(client, dbName, collectionName);
    await instanceComparisonCollection.deleteMany({ $or: [...instanceComparison.map((name) => ({ name }))] });
    return;
}
