import { CategoryProvider } from "../categories/categoryprovider";
import { MappingDB } from "./mappingdb";
import { CSVReader } from "../csvimport/CSVReader";
import { Category } from "../interfaces/category.interface";
import { InstanceComparison } from "../interfaces/instancecomparison.interface";
import { Instance } from "../interfaces/instance.interface";
import { Attributes } from "../interfaces/attributes.interface";

export class MappingService {
    constructor(
        private categoryprovider: CategoryProvider,
        private mappingdb: MappingDB,
        private csvreader: CSVReader
    ) {}

    async start() {
        await this.mappingdb.dropInstanceComparison();

        let skuArr: string[];

        while (true) {
            try {
                skuArr = await this.getNextLine();
                await this.forEachSku(skuArr as string[]);
            } catch (error) {
                break;
            }
        }

        await this.mappingdb.pushCategories(this.categoryprovider.categories);
    }

    async getNextLine() {
        try {
            const line = (await this.csvreader.readLine())[0];

            if (line) {
                return Object.values(line); //list of values
            } else {
                throw new Error("end of lines");
            }
        } catch (error) {
            throw new Error("end of lines");
        }
    }

    async forEachSku(skuArr: string[]) {
        let instanceArr = (await this.mappingdb.findSkus(skuArr)) as Instance[];
        let attributes: { [attributeName: string]: string } = {};

        for (let instance of instanceArr) {
            try {
                let category = await this.categoryprovider.findCategory(instance);
                attributes = { ...attributes, ...this.getAttributesForInstance(instance, category) };
            } catch (error) {
                continue;
            }
        }
        await this.createInstanceCompare(instanceArr, attributes);
    }

    getAttributesForInstance(instance: Instance, category: Category): Attributes {
        let attributes: Attributes = {};

        for (let i = 0; i < category.vendors.length; i++) {
            for (let columnName in category.vendors[i].columns) {
                let path = category.vendors[i].columns[columnName].path;

                //value from the instance to write in category.field options
                const value = path.reduce((currentValue, path) => currentValue[path], instance as any) as string;

                // finds the correct category.field and pushes new value to option
                if (value !== undefined) {
                    let categoryField = category.fields.find((field) => field.name === columnName);
                    categoryField?.options?.push(value);
                    attributes[columnName] = value;
                }
            }
        }
        return attributes;
    }

    async createInstanceCompare(instanceArr: Instance[], attributes: Attributes) {
        let newInstanceComparison: InstanceComparison = {
            name: instanceArr[0].productFamily, //TODO: Name should be proper
            price: {},
            fields: {},
            skus: [] as any[]
        } as InstanceComparison;

        for (let instance of instanceArr) {
            //TODO There is going to be a "service", so we can pass the instance and
            // get the correct price and unit.

            newInstanceComparison.price[instance.vendorName] = {
                value: instance.prices[0].USD.toString(),
                unit: instance.prices[0].unit.toString()
            };

            newInstanceComparison.skus.push(instance.sku);
        }

        for (let columnName in attributes) {
            newInstanceComparison.fields[columnName] = {
                value: attributes[columnName],
                //TODO: unit of the attribute values
                unit: ""
            };
        }

        await this.mappingdb.pushInstanceComparison(newInstanceComparison);
    }
}
