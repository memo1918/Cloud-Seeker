import { execQuery } from "../index";
import { getCollection } from "../schema";
import { Document, WithId } from "mongodb";

interface VisitorsDocument extends WithId<Document> {
    name: string;
    visits: number;
}

export async function getVisits(name: string): Promise<number> {
    return execQuery(async (client) => {
        let collection = await getCollection(client, "website", "visitors");
        await collection.updateOne(
            { name },
            {
                $inc: { visits: 1 },
                $set: { name }
            },
            { upsert: true }
        );
        let document: VisitorsDocument | null = await collection.findOne<VisitorsDocument>({ name });
        return document ? document.visits : 0;
    });
}
