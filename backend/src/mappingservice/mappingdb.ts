import { execQuery } from "../db";
import { findServices } from "../db/models/services";
import { updateCategories } from "../db/models/categories";
import { Category } from "./interfaces";

export class MappingDB {
    async findSkus(skuArr: string[]) {
        return await execQuery(async (client) => {
            return await findServices(client, skuArr); // returns a list
        });
    }

    async pushDb(category: Category) {
        await execQuery(async (client) => {
            return await updateCategories(client, category);
        });
    }
}
