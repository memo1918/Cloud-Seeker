import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface IServices extends WithId<Document> {
    name: string;
}

const dbName = "cloud-seeker";
const collectionName = "services";

export async function findServices(client: MongoClient, sku: string[]) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.find({ sku: { $in: sku } }).toArray();
}

export async function dropServices(client: MongoClient) {
    return client.db(dbName).dropCollection(collectionName);
}

export async function createServicesIndex(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.createIndex({
        sku: "text"
    });
}

export async function insertServicesData(client: MongoClient, services: any[]) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.insertMany(services);
}

export async function getUniqueVendors(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.distinct("vendorName");
}