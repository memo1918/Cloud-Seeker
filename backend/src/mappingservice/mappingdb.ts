import { execQuery } from "../db";
import { findServices } from "../db/models/services";
import { addCategories, dropCategories } from "../db/models/categories";
import {
    addOneInstanceComparison,
    createInstanceComparisonIndex,
    dropInstanceComparison
} from "../db/models/instancecomparison";
import { Document, WithId } from "mongodb";
import { Category } from "../interfaces/category.interface";
import { InstanceComparison } from "../interfaces/instancecomparison.interface";

/**
 * interface for the mapping db
 */
export interface MappingDB {
    /**
     * finds the skus in the database
     * @param skuArr the skus to find
     * @returns {Promise<WithId<Document>[]>} a promise that resolves to a list of documents
     */
    findSkus: (skuArr: string[]) => Promise<WithId<Document>[]>;
    /**
     * pushes the categories to the database
     * @param categories the categories to push
     * @returns {Promise<void>} a promise that resolves when the categories are pushed
     */
    pushCategories: (categories: Category[]) => Promise<void>;

    /**
     * pushes the instance comparison to the database
     * @param instanceComparison the instance comparison to push
     * @returns {Promise<void>} a promise that resolves when the instance comparison is pushed
     */
    pushInstanceComparison(instanceComparison: InstanceComparison): Promise<void>;

    /**
     * drops the instance comparison collection
     * @returns {Promise<void>} a promise that resolves when the collection is dropped
     */
    dropInstanceComparison(): Promise<void>;

    /**
     * creates the instance comparison index
     * @returns {Promise<void>} a promise that resolves when the index is created
     */
    createInstanceComparisonIndex(): Promise<void>;
}

/**
 * class for the mapping db that implements the mapping db interface for mongodb
 */
export class MappingMongoDB implements MappingDB {
    async findSkus(skuArr: string[]) {
        return await execQuery(async (client) => {
            return await findServices(client, skuArr); // returns a list
        });
    }

    async pushCategories(categories: Category[]) {
        await execQuery(async (client) => {
            await dropCategories(client);
            return await addCategories(client, categories);
        });
    }

    async pushInstanceComparison(instanceComparison: InstanceComparison) {
        await execQuery(async (client) => {
            return await addOneInstanceComparison(client, instanceComparison);
        });
    }

    async dropInstanceComparison() {
        await execQuery(async (client) => {
            return await dropInstanceComparison(client);
        });
    }
    async createInstanceComparisonIndex() {
        await execQuery(async (client) => {
            return await createInstanceComparisonIndex(client);
        });
    }
}
