import {execQuery} from "../db";
import {_getAllCategories, ICategory} from "../db/models/categories";

export async function getAllCategories() {
    return execQuery<ICategory[]>(_getAllCategories);
}