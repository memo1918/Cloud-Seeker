import { getCollection } from "../schema";
import { MongoClient } from "mongodb";
import { Category } from "../../interfaces/category.interface";

const dbName = "cloud-seeker";
const collectionName = "categories";

export async function _getAllCategories(client: MongoClient) {
    let categoryCollection = await getCollection(client, "cloud-seeker", "categories");
    return (await categoryCollection.find({}).toArray()) as any[] as Category[];
}

export async function addCategories(client: MongoClient, category: Partial<Category>[]) {
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
