import { getCollection } from "../schema";
import { MongoClient } from "mongodb";
import { Category } from "../../interfaces/category.interface";

/**
 * this is the name of the database and collection to use
 */
const dbName = "cloud-seeker";
/**
 * this is the name of the database and collection to use
 */
const collectionName = "categories";

/**
 * this function finds all categories in the database
 * @param client the client to use to connect to the database
 * @returns {Promise<Category[]>} all categories
 */
export async function _getAllCategories(client: MongoClient): Promise<Category[]> {
    // get the collection from the database and return all categories
    let categoryCollection = await getCollection(client, dbName, collectionName);
    return (await categoryCollection.find({}).toArray()) as any[] as Category[];
}

/**
 * this function adds categories to the database
 * @param client the client to use to connect to the database
 * @param category the categories to add
 * @returns {Promise<void>} nothing
 */
export async function addCategories(client: MongoClient, category: Partial<Category>[]): Promise<void> {
    // get the collection from the database and insert the categories supplied
    let categoryCollection = await getCollection(client, dbName, collectionName);
    await categoryCollection.insertMany(category);
    return;
}

/**
 * this function drops the categories collection from the database
 * @param client the client to use to connect to the database
 * @returns {Promise<boolean>} true if the collection was dropped, false otherwise
 */
export async function dropCategories(client: MongoClient) {
    // get the collection from the database and drop it
    return client.db(dbName).dropCollection(collectionName);
}

/**
 * this function removes categories from the database
 *
 * @param client the client to use to connect to the database
 * @param categories the categories to remove
 *
 * @returns {Promise<void>} nothing
 */
export async function removeCategories(client: MongoClient, categories: string[]) {
    // get the collection from the database
    let categoryCollection = await getCollection(client, dbName, collectionName);
    // delete all categories that match the names supplied in the categories array by using the $or operator
    await categoryCollection.deleteMany({ $or: [...categories.map((name) => ({ name }))] });
    return;
}
