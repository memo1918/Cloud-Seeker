import { Category, CategoryField, CategoryVendor, Instance, InstanceComparison } from "./interfaces";
import { execQuery } from "../db";
import { findServices } from "../db/models/services";
import { updateCategories } from "../db/models/categories";
import { CategoryProvider } from "../categories/categoryprovider";
import { ReadCSV } from "../csvimport/readlinebyline";

export class MappingService {
    private categoryprovider: CategoryProvider;

    constructor() {
        this.categoryprovider = new CategoryProvider();
    }

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
        let attributes: { [attributeName: string]: string } = {};
        for (let instance of instanceArr) {
            let category = await this.categoryprovider.findCategory(instance);
            attributes = { ...attributes, ...this.getAttributesForInstance(instance, category) };
        }

        await this.createInstanceCompare(instanceArr, attributes);
    }

    getAttributesForInstance(instance: Instance, category: Category) {
        let attributes: { [attributeName: string]: string } = {};
        for (let columnName in category.vendors[0].columns) {
            let path = category.vendors[0].columns[columnName].path;

            //value from the instance to write in category.field options
            const value = path.reduce((currentValue, path) => currentValue[path], instance as any) as string;

            // finds the correct category.field and pushes new value to option
            let categoryField = category.fields.find((field) => field.name === columnName);
            categoryField?.options?.push(value);

            attributes[columnName] = value;
        }
        return attributes;
    }

    async pushDb(category: Category) {
        await execQuery(async (client) => {
            return await updateCategories(client, category);
        });
    }

    async createInstanceCompare(instanceArr: Instance[], attributes: object) {
        let newInstanceComparison: InstanceComparison = {
            price: {},
            skus: [] as any[]
        } as InstanceComparison;

        newInstanceComparison.name = "ich weiss es nich";

        for (let instance of instanceArr) {
            // There is going to be a "service", so we can pass the instance prices and
            // get the correct price and unit.
            for (const key of Object.keys(instance.prices)) {
                console.log(key);
                newInstanceComparison.price[instance.vendorName] = {
                    value: instance.prices[key][0].unit,
                    unit: instance.prices[key][0].unit
                };
            }
            newInstanceComparison.skus.push(instance.sku);
        }

        let awsInstance = instanceArr.find((instance) => instance.vendorName === "aws");
    }
}
