import * as fs from "fs";
import { Category } from "../mappingservice/interfaces";

export function getCategoryTemplate() {
    let path = "C:\\Users\\mehme\\Downloads\\School\\SoftwareLAB\\cloud-seeker\\schema\\samplecategory.json";
    return JSON.parse(fs.readFileSync(path, "utf-8").toString()) as Category[];
}
