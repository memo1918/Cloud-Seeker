import { execQuery } from "../index";
import { getCollection } from "../schema";
import { Document, WithId } from "mongodb";

// interface for the visits of  a specific website
interface VisitorsDocument extends WithId<Document> {
    // the name of the website or page
    name: string;
    // the number of visits for the website or page
    visits: number;
}

// this function gets the visits for a specific website or page and increments the visits by one
export async function getVisits(name: string): Promise<number> {
    return execQuery(async (client) => {
        // get the collection storing the visits from the database
        let collection = await getCollection(client, "website", "visitors");
        // update the viewcount for the website or page by incrementing it by one
        await collection.updateOne(
            { name },
            {
                $inc: { visits: 1 },
                $set: { name }
            },
            { upsert: true }
        );
        // get the current vuewcount for the website or page
        let document: VisitorsDocument | null = await collection.findOne<VisitorsDocument>({ name });
        return document ? document.visits : 0;
    });
}
