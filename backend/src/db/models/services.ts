import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface IService extends WithId<Document> {
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

export async function getDistinctVendors(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.distinct("vendorName");
}

export async function getDistinctUnits(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.distinct("prices.unit");
}

export async function _getDistinctUnitsGroupedByServiceFamily(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);

    return await serviceCollection.aggregate([
        { $unwind: "$prices" },
        {
            $group: {
                _id: "$productFamily",
                units: {
                    $addToSet: "$prices.unit"
                }
            }
        }
    ]).toArray() as {
        "_id": string,
        "units": string[]
    }[];
}