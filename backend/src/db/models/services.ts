import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface IServices extends WithId<Document> {
    name: string;
}


export async function findServices(client: MongoClient, sku:string[])  {
    let serviceCollection = await getCollection(client, "cloud-seeker", "services");
    return serviceCollection.find({ sku: {$in: sku} }).toArray();
}

