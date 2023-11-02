import { Category, Instance, InstanceComparison } from "./interfaces";
import { CategoryProvider } from "../categories/categoryprovider";
import { ReadCSV } from "../csvimport/readlinebyline";
import { MappingDB } from "./mappingdb";

export class MappingService {
    private categoryprovider: CategoryProvider;
    private mappingdb: MappingDB;
    private csvreader: ReadCSV;

    constructor() {
        this.categoryprovider = new CategoryProvider();
        this.mappingdb = new MappingDB();
        this.csvreader = new ReadCSV("../backend/src/dummyCsvImport.csv"); //can be changed to parameter
    }

    async start() {
        await this.mappingdb.dropInstanceComparioson();

        let skuArr = await this.getNextLine();
        while (skuArr != false) {
            await this.forEachSku(skuArr as string[]);

            skuArr = await this.getNextLine();
        }
        await this.mappingdb.pushCategories(this.categoryprovider.categories);
    }

    async getNextLine() {
        try {
            const line = await this.csvreader.readLine();

            if (line) {
                return Object.values(line); //list of values
            } else {
                return false;
            }
        } catch (error) {
            console.log("error/end of file");
            return false;
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

    getAttributesForInstance(instance: Instance, category: Category) {
        let attributes: { [attributeName: string]: string } = {};

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

    async createInstanceCompare(instanceArr: Instance[], attributes: { [attributeName: string]: string }) {
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
