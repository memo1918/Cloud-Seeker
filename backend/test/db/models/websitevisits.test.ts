import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

describe("website visite module", () => {
    let mongoServer: MongoMemoryServer;

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
        } catch (e) {}
    });

    afterEach(async () => {
        try {
            await mongoServer.stop({ force: true, doCleanup: true });
        } catch (e) {}
    });

    test("creating and incrementing unvisited element", async () => {
        const { setURI } = await import("../../../src/db");
        const { getVisits } = await import("../../../src/db/models/websitevisits");
        setURI(mongoServer.getUri());

        await expect(getVisits("test_my_unique_name")).resolves.toBe(1);

        let client = await new MongoClient(mongoServer.getUri()).connect();

        let collections = (await client.db("website").collections()).map((c) => c.collectionName);

        expect(collections).toContain("visitors");

        await expect(
            client.db("website").collection("visitors").findOne({ name: "test_my_unique_name" })
        ).resolves.toMatchObject({
            name: "test_my_unique_name",
            visits: 1
        });
        await client.close();
    });
});
