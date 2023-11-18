import { getCategoryTemplate } from "./categorytemplateread";
import { Category } from "../interfaces/category.interface";
import { Instance } from "../interfaces/instance.interface";
import { result } from "lodash";

export class CategoryProvider {
    public categories: Category[];

    constructor(categories: Category[] = getCategoryTemplate()) {
        this.categories = categories;
    }

    async findCategory(instance: Instance) {
        for (let category of this.categories) {
            if (!category.discovery[instance.vendorName]) {
                throw new Error("UwU, didn't find the vendor :/ ");
            }

            let path = category.discovery[instance.vendorName].key;
            let value = result(instance, path, "");

            if (category.discovery[instance.vendorName].value.indexOf(value) != -1) {
                return category;
            }
        }
        throw new Error("UwU, didn't find the category :/ ");
    }
}
