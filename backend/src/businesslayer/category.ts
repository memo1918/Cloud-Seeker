import { execQuery } from "../db";
import { _getAllCategories } from "../db/models/categories";
import { Category } from "../interfaces/category.interface";

// wrapper method for _getAllCategories for easy mocking
export async function getAllCategories() {
    return execQuery<Category[]>(_getAllCategories);
}
