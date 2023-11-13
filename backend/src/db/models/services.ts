import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface IService extends WithId<Document> {
    productHash: string;
    sku: string;
    vendorName: string;
}

export const dbName = "cloud-seeker";
export const collectionName = "services";

export async function findServices(client: MongoClient, sku: string[]) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.find({ sku: { $in: sku } }).toArray();
}

export async function getUniqueVendors(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.distinct("vendorName");
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

export async function _getDistinctUnitsGroupedByServiceFamily(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);

    return (await serviceCollection
        .aggregate([
            { $unwind: "$prices" },
            {
                $group: {
                    _id: "$productFamily",
                    units: {
                        $addToSet: "$prices.unit"
                    }
                }
            }
        ])
        .toArray()) as {
        _id: string;
        units: string[];
    }[];
}
