import { readFileSync } from "fs";

import { Category } from "../interfaces/category.interface";

let defpath = "C:\\Users\\mehme\\Downloads\\School\\SoftwareLAB\\cloud-seeker\\schema\\samplecategory.json";

export function getCategoryTemplate(readFileFn = readFileSync, path: string = defpath) {
    let data: Category[];
    try {
        let readString = readFileFn(path, "utf-8");
        data = JSON.parse(readString) as Category[];
        return data;
    } catch (error) {
        throw new Error("file read error");
    }
}
