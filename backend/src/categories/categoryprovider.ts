import { getCategoryTemplate } from "./categorytemplateread";
import { Category } from "../interfaces/category.interface";
import { Instance } from "../interfaces/instance.interface";
import { result } from "lodash";

/**
 * this class is responsible for finding the category of an instance
 */
export class CategoryProvider {
    /**
     * the categories found in the configuration file
     */
    public categories: Category[];

    /**
     * loads the categories from the configuration file
     *
     * @param categories the categories to load defaults to the return value from `getCategoryTemplate`
     */
    constructor(categories: Category[] = getCategoryTemplate()) {
        this.categories = categories;
    }

    /**
     * finds the category of an instance
     *
     * @param instance the instance to find the category for
     * @returns {Promise<Category>} the category of the instance
     */
    async findCategory(instance: Instance): Promise<Category> {
        // iterate over all categories
        for (let category of this.categories) {
            // if the vendor is not in the discovery object, the category is not valid
            if (!category.discovery[instance.vendorName]) {
                throw new Error("UwU, didn't find the vendor :/ ");
            }
            // if the value of the instance is in the value array of the discovery object, the category is valid
            let path = category.discovery[instance.vendorName].key;
            let value = result(instance, path, "");
            // check if the value is in the array specified in the discovery object
            if (category.discovery[instance.vendorName].value.indexOf(value) != -1) {
                return category;
            }
        }
        // if no category was found, throw an error
        throw new Error("UwU, didn't find the category :/ ");
    }
}
