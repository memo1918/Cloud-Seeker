import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface IService extends WithId<Document> {
    productHash: string;
    sku: string;
    vendorName: string;
}

export async function findServices(client: MongoClient, sku: string[]) {
    let serviceCollection = await getCollection(client, "cloud-seeker", "services");
    return serviceCollection.find({ sku: { $in: sku } }).toArray();
}
