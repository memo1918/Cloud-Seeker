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

export interface MappingDB {
    findSkus: (skuArr: string[]) => Promise<WithId<Document>[]>;
    pushCategories: (categories: Category[]) => Promise<void>;

    pushInstanceComparison(instanceComparison: InstanceComparison): Promise<void>;

    dropInstanceComparison(): Promise<void>;

    createInstanceComparisonIndex(): Promise<void>;
}

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
