import { getCategoryTemplate } from "./categorytemplateread";
import { Category } from "../interfaces/category.interface";
import { Instance } from "../interfaces/instance.interface";

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

            if (category.discovery[instance.vendorName].value.indexOf(instance.productFamily) != -1) {
                return category;
            }
        }
        throw new Error("UwU, didn't find the category :/ ");
    }
}
