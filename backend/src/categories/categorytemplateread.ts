import { readFileSync } from "fs";

import { Category } from "../mappingservice/interfaces/category.interface";

let defpath = "C:\\Users\\mehme\\Downloads\\School\\SoftwareLAB\\cloud-seeker\\schema\\samplecategory.json";

export function getCategoryTemplate(path: string = defpath) {
    try {
        let data = JSON.parse(readFileSync(path, "utf-8").toString()) as Category[];
        return data;
    } catch (error) {
        throw new Error("file read error");
    }
}
