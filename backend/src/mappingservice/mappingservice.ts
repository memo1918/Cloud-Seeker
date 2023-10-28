import { Category, Instance, InstanceComparison } from "./interfaces";
import { CategoryProvider } from "../categories/categoryprovider";
import { ReadCSV } from "../csvimport/readlinebyline";
import { MappingDB } from "./mappingdb";

export class MappingService {
    private categoryprovider: CategoryProvider;
    private mappingdb: MappingDB;
    private csvreader: ReadCSV;
    private instanceClist: InstanceComparison[];

    constructor() {
        this.categoryprovider = new CategoryProvider();
        this.mappingdb = new MappingDB();
        this.csvreader = new ReadCSV("../backend/src/dummyCsvImport.csv"); //can be changed to parameter
        this.instanceClist = [];
    }

    async start() {
        let skuArr = await this.getNextLine();

        while (skuArr !== -1) {
            await this.forEachSku(skuArr as string[]);

            skuArr = await this.getNextLine();
        }

        console.log(this.categoryprovider.categories);
    }

    async getNextLine() {
        // TODO: readLine() breaks and goes into infinit after no lines left to read.
        try {
            const line = await this.csvreader.readLine();

            if (line) {
                return line;
            } else {
                return -1;
            }
        } catch (error) {
            console.log("error/end of file");
            return -1;
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
                return;
            }
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
            if (value !== undefined) {
                let categoryField = category.fields.find((field) => field.name === columnName);
                categoryField?.options?.push(value);
                attributes[columnName] = value;
            }
        }

        return attributes;
    }

    async createInstanceCompare(instanceArr: Instance[], attributes: { [attributeName: string]: string }) {
        let newInstanceComparison: InstanceComparison = {
            name: "ich weiss es nicht", //TODO: Name should be proper
            price: {},
            fields: {},
            skus: [] as any[]
        } as InstanceComparison;

        for (let instance of instanceArr) {
            for (const key of Object.keys(instance.prices)) {
                //TODO There is going to be a "service", so we can pass the instance and
                // get the correct price and unit.

                newInstanceComparison.price[instance.vendorName] = {
                    value: instance.prices[key][0].USD,
                    unit: instance.prices[key][0].unit
                };
            }
            newInstanceComparison.skus.push(instance.sku);
        }

        for (let columnName in attributes) {
            newInstanceComparison.fields[columnName] = {
                value: attributes[columnName],
                //TODO: unit of the attribute values
                unit: ""
            };
        }

        this.instanceClist.push(newInstanceComparison);
    }
}
