import {getCollection} from "../schema";
import {MongoClient} from "mongodb";

export interface ICategory {
    name: string;
    icon: string;
    description: string;
    fields: {
        name: string;
        options: (string | number)[];
        unit: string;
    }[];
}

export async function _getAllCategories(client: MongoClient) {
    let categoryCollection = await getCollection(client, "cloud-seeker", "categories");
    return (await categoryCollection
        .find({})
        .map((doc) => ({name: doc.name, icon: doc.icon, description: doc.description, fields: doc.fields}))
        .toArray()) as ICategory[];
}
