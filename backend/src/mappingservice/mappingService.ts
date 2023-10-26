import { Category, CategoryField, CategoryVendor, Instance } from "./interfaces";
import { execQuery } from "../db";
import { findServices } from "../db/models/services";
import { getCategoryTemplate } from "./categoryjsonread";

export class MappingService {
    constructor() {}

    async getNextLine() {
        return [
            "DZH318Z0CSHB/Standard_E16-4ds_v4/b79c3e44-d17d-58a9-b1eb-da09ed48af83",
            "ZGR6DNXRR5737GXS",
            "generated-n2d-highcpu-32"
        ];
    }

    async findSkus(skuArr: string[]) {
        return await execQuery(async (client) => {
            return await findServices(client, skuArr); // returns a list
        });
    }

    async forEachSku() {
        let instanceArr = (await this.findSkus(await this.getNextLine())) as Instance[];

        for (let instance of instanceArr) {
            await this.mapCategory(instance);
        }
    }

    async mapCategory(instance: Instance) {
        let categories = getCategoryTemplate() as Category[];
        for (let category of categories) {
            if (!category.discovery[instance.vendorName]) {
                console.log("UwU");
            }
            if (category.discovery[instance.vendorName].value.indexOf(instance.productFamily) != -1) {
            }
        }
    }
}
