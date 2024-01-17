import { execQuery } from "../db";
import { _getAllCategories } from "../db/models/categories";
import { Category } from "../interfaces/category.interface";

/**
 * wrapper method for `_getAllCategories` for easy mocking
 *
 * request all categories from the db by creating a query and executing it
 *
 * @returns {Promise<Category[]>} all categories
 */
export async function getAllCategories() {
    return execQuery<Category[]>(_getAllCategories);
}
