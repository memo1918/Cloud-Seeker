import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";

export interface IPizzas extends WithId<Document> {
    name: string;
}

export async function getAllpizzas(client: MongoClient) {
    let pizzaCollection = await getCollection(client, "cloud-seeker", "pizzas");
    return (await pizzaCollection.find({}).toArray()) as IPizzas[];
}