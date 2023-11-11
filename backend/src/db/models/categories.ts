import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface ICategory extends WithId<Document> {
    name: string;
}

const dbName = "cloud-seeker";
const collectionName = "categories";

export async function getAllCategories(client: MongoClient) {
    let categoryCollection = await getCollection(client, dbName, collectionName);
    return (await categoryCollection.find({}).toArray()) as ICategory[];
}

export async function addCategories(client: MongoClient, category: Partial<ICategory>[]) {
    let categoryCollection = await getCollection(client, dbName, collectionName);
    await categoryCollection.insertMany(category);
    return;
}

export async function dropCategories(client: MongoClient) {
    return client.db(dbName).dropCollection(collectionName);
}

export async function removeCategories(client: MongoClient, categories: string[]) {
    let categoryCollection = await getCollection(client, dbName, collectionName);
    await categoryCollection.deleteMany({ $or: [...categories.map((name) => ({ name }))] });
    return;
}
