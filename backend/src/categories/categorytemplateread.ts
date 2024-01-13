import { readFileSync } from "fs";
import { Category } from "../interfaces/category.interface";

/**
 * this is the default path to the category template it is set to the environment variable CATEGORY_TEMPLATES
 */
let defpath = process.env.CATEGORY_TEMPLATES || "";

/**
 * this function reads the category template from the file system
 *
 * @param readFileFn the function to read the file with defaults to `readFileSync`
 * @param path the path to the file defaults to the value of the environment variable CATEGORY_TEMPLATES
 *
 * @returns {Category[]} the category templates
 */
export function getCategoryTemplate(readFileFn = readFileSync, path: string = defpath): Category[] {
    try {
        // read the file
        let readString = readFileFn(path, "utf-8");
        // parse the file as json and assume it is an array of categories
        return JSON.parse(readString) as Category[];
    } catch (error) {
        // if an error occurs, throw an error
        throw new Error("file read error");
    }
}
