import { execQuery } from "../db";
import { findServices, IServices } from "../db/models/services";

export class Mappingservice {
    constructor() {}

    async addMappings(sku: string[]) {
        let foundServices = await execQuery(async (client) => {
            return await findServices(client, sku);
        });

        return foundServices;
    }
}
