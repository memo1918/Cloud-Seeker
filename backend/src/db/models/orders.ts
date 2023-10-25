import { getCollection } from "../schema";
import { Document, MongoClient, WithId } from "mongodb";


export interface IOrders extends WithId<Document> {
    name: string;
}

export async function getAllOrders(client: MongoClient) {
    let orderCollection = await getCollection(client, "cloud-seeker", "order");
    return (await orderCollection.find({}).toArray()) as IOrders[];
}

export async function addOrder(client: MongoClient, order: Partial<IOrders>[]) {
    let orderCollection = await getCollection(client, "cloud-seeker", "order");
    await orderCollection.insertMany(order);
    return;
}
export async function deleteOrder(client: MongoClient, orders: string[]) {
    let orderCollection = await getCollection(client, "cloud-seeker", "order");
    await orderCollection.deleteMany({ $or: [...orders.map((name) => ({ name }))] });
    return;
}
