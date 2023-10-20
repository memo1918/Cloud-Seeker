import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface ICategory extends WithId<Document> {
    name: string;
}

export async function getAllCategories(client: MongoClient) {
    let categoryCollection = await getCollection(client, "cloud-seeker", "categories");
    return await categoryCollection.find().toArray() as ICategory[];
}

export async function addCategories(client: MongoClient, category: Partial<ICategory>[]) {
    let categoryCollection = await getCollection(client, "cloud-seeker", "categories");
    await categoryCollection.insertMany(category);
    return;
}

export async function removeCategories(client: MongoClient, categories: string[]) {
    let categoryCollection = await getCollection(client, "cloud-seeker", "categories");
    await categoryCollection.deleteMany({ $or:[
            ...categories.map(name=>({name}))
        ] });
    return;
}