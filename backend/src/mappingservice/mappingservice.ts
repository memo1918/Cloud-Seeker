import { CategoryProvider } from "../categories/categoryprovider";
import { MappingDB } from "./mappingdb";
import { CSVReader } from "../csvimport/CSVReader";
import { Category } from "../interfaces/category.interface";
import { InstanceComparison } from "../interfaces/instancecomparison.interface";
import { Instance } from "../interfaces/instance.interface";
import { Attributes } from "../interfaces/attributes.interface";
import { result } from "lodash";

/**
 * class for the mapping service
 */
export class MappingService {
    /**
     * constructor for the mapping service
     * @param categoryprovider the category provider
     * @param mappingdb the mapping db
     * @param csvreader the csv reader
     */
    constructor(
        private categoryprovider: CategoryProvider,
        private mappingdb: MappingDB,
        private csvreader: CSVReader
    ) {
    }

    /**
     * starts the mapping service
     * @returns {Promise<void>} a promise that resolves when the mapping service is completed
     */
    async start() {
        await this.mappingdb.dropInstanceComparison();
        await this.mappingdb.createInstanceComparisonIndex();

        let skuArr: string[];

        while (true) {
            try {
                skuArr = await this.getNextLine();
                await this.forEachSku(skuArr as string[]);
            } catch (error: any) {
                if (error.message === "instance problem") continue;
                else break;
            }
        }

        this.cleanOptions();
        await this.mappingdb.pushCategories(this.categoryprovider.categories);
    }

    /**
     * cleans the options of the fields
     * @private
     */
    private cleanOptions() {
        for (let category of this.categoryprovider.categories) {
            for (let field of category.fields) {
                field.options = [...new Set(field.options).values()].sort();
            }
        }
    }

    /**
     * gets the next line from the csv reader
     */
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

    /**
     * for each sku in the sku array
     * @param skuArr the sku array
     * @returns {Promise<void>} a promise that resolves when the sku array is processed
     */
    async forEachSku(skuArr: string[]) {
        try {
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
            for (const field of category.fields) {
                if (!attributes[field.name]) {
                    attributes[field.name] = "NA";
                }
            }

            await this.createInstanceCompare(instanceArr, attributes, category);
        } catch (error) {
            throw new Error("instance problem");
        }
    }

    /**
     * gets the attributes for an instance and a category
     * @param instance the instance
     * @param category the category
     * @returns {Attributes} the attributes for the instance and the category
     */
    getAttributesForInstance(instance: Instance, category: Category): Attributes {
        let attributes: Attributes = {};

        for (let i = 0; i < category.vendors.length; i++) {
            for (let columnName in category.vendors[i].columns) {
                let path = category.vendors[i].columns[columnName].path;
                let value = result(instance, path, null);
                //value from the instance to write in category.field options
                // const value = path.reduce((currentValue, path) => currentValue[path], instance as any) as string;

                // finds the correct category.field and pushes new value to option
                if (value != null) {
                    let categoryField = category.fields.find((field) => field.name === columnName);
                    categoryField?.options?.push(value);
                    attributes[columnName] = value;
                }
            }
        }
        return attributes;
    }

    /**
     * creates an instance comparison
     * @param instanceArr the instance array
     * @param attributes the attributes
     * @param category the category
     * @returns {Promise<void>} a promise that resolves when the instance comparison is created and pushed to the database
     */
    async createInstanceCompare(instanceArr: Instance[], attributes: Attributes, category: Category) {
        let newInstanceComparison: InstanceComparison = {
            name: {},
            categoryName: category.name,
            price: {},
            fields: {},
            skus: [] as any[]
        } as InstanceComparison;

        for (let instance of instanceArr) {
            newInstanceComparison.name[instance.vendorName] = instance.service;

            //TODO There is going to be a "service", so we can pass the instance and
            // get the correct price and unit.
            newInstanceComparison.price[instance.vendorName] = {
                value: "0",
                unit: ""
            };

            for (let i = 0; i < instance.prices.length; i++) {
                newInstanceComparison.price[instance.vendorName] = {
                    value: instance.prices[i].USD.toString(),
                    unit: instance.prices[i].unit.toString()
                };
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
