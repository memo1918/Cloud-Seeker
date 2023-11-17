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

        this.cleanOptions();
        await this.mappingdb.pushCategories(this.categoryprovider.categories);
    }

    private cleanOptions() {
        for (let category of this.categoryprovider.categories) {
            for (let field of category.fields) {
                field.options = [...new Set(field.options).values()].sort();
            }
        }
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
        let category = await this.categoryprovider.findCategory(instanceArr[1]);
        for (let instance of instanceArr) {
            try {
                attributes = { ...attributes, ...this.getAttributesForInstance(instance, category) };
            } catch (error) {
                continue;
            }
        }

        await this.createInstanceCompare(instanceArr, attributes, category);
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

    async createInstanceCompare(instanceArr: Instance[], attributes: Attributes, category: Category) {
        let newInstanceComparison: InstanceComparison = {
            name: instanceArr[0].productFamily, //TODO: Name should be proper
            categoryName: category.name,
            price: {},
            fields: {},
            skus: [] as any[]
        } as InstanceComparison;

        for (let instance of instanceArr) {
            //TODO There is going to be a "service", so we can pass the instance and
            // get the correct price and unit.
            newInstanceComparison.price[instance.vendorName] = {
                value: "0",
                unit: ""
            };

            for (let i = 0; i < instance.prices.length; i++) {
                let price = parseFloat(instance.prices[i].USD);
                if (price != 0) {
                    newInstanceComparison.price[instance.vendorName] = {
                        value: instance.prices[i].USD.toString(),
                        unit: instance.prices[i].unit.toString()
                    };
                }
            }

            newInstanceComparison.skus.indexOf(instance.sku) === -1
                ? newInstanceComparison.skus.push(instance.sku)
                : "";
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
