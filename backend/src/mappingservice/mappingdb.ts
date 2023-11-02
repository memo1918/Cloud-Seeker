import { execQuery } from "../db";
import { findServices } from "../db/models/services";
import { addCategories, dropCategories } from "../db/models/categories";
import { addInstanceComparison, dropInstanceComparion } from "../db/models/instancecomparison";
import { Category, InstanceComparison } from "./interfaces";

export class MappingDB {
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
            return await addInstanceComparison(client, instanceComparison);
        });
    }

    async dropInstanceComparioson() {
        await execQuery(async (client) => {
            return await dropInstanceComparion(client);
        });
    }
}
