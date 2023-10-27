import { getCategoryTemplate } from "./categoryjsonread";
import { Category, Instance } from "../mappingservice/interfaces";

export class CategoryProvider {
    public categories: Category[] = [];

    async findCategory(instance: Instance) {
        this.categories = getCategoryTemplate();

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
