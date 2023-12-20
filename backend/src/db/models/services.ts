import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

// this interface is used to define the structure of the service object
export interface IService extends WithId<Document> {
    // this is the name of the service
    productHash: string;
    // this is the stock keeping unit of the service
    sku: string;
    // this is the name of the vendor of the service
    vendorName: string;
}

// this is the name of the database and collection
export const dbName = "cloud-seeker";
export const collectionName = "services";

// this function finds all services which match the skus supplied
export async function findServices(client: MongoClient, sku: string[]) {
    // get the collection from the database and return all services that match the skus supplied
    let serviceCollection = await getCollection(client, dbName, collectionName);

    let result = await Promise.all(
        // make a request for each sku
        sku.map(async (i) => {
            // find all services that match the sku
            return (await serviceCollection.find({ sku: i }).toArray()) as any[];
        })
    );
    // flatten the result
    return result.flat();
}

// this function finds all unique vendors from the services
export async function getUniqueVendors(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.distinct("vendorName");
}

// this function drops the services collection
export async function dropServices(client: MongoClient) {
    return client.db(dbName).dropCollection(collectionName);
}

// this function creates the indexes for the services collection
export async function createServicesIndex(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    // create a index for the sku
    await serviceCollection.createIndex({ sku: 1 });
    return serviceCollection.createIndex({
        sku: "text"
    });
}

// this function adds multiple services to the database
export async function insertServicesData(client: MongoClient, services: any[]) {
    let serviceCollection = await getCollection(client, dbName, collectionName);
    return serviceCollection.insertMany(services);
}

// this function gets the distinct units grouped by service family used for development
export async function _getDistinctUnitsGroupedByServiceFamily(client: MongoClient) {
    let serviceCollection = await getCollection(client, dbName, collectionName);

    return (await serviceCollection
        // unwind the prices array in order to group by product family and adding the units to a set
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
