import * as fs from "fs";

export function getCategoryTemplate() {
    let path = "C:\\Users\\mehme\\Downloads\\School\\SoftwareLAB\\cloud-seeker\\schema\\samplecategory.json";
    return JSON.parse(fs.readFileSync(path, "utf-8").toString());
}
