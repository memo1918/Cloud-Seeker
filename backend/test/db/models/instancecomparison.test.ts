import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { IInstanceComparison } from "../../../src/db/models/instancecomparison";

let dbName = "cloud-seeker";
let collectionName = "instancecomparison";
describe("instancecomparison db", () => {
    let mongoServer: MongoMemoryServer;
    let fixtureInstanceComparison: Partial<IInstanceComparison>[] = [
        {
            name: "test1",
            categoryName: "Compute"
        },
        {
            name: "test2",
            categoryName: "Storage"
        }
    ];

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
            await mongoServer.ensureInstance();
        } catch (e) {}
        while (true) {
            try {
                let client = await new MongoClient(mongoServer.getUri(), {}).connect();
                await client.db(dbName).collection(collectionName).insertMany(fixtureInstanceComparison);
                break;
            } catch (err) {}
        }
    });

    afterEach(async () => {
        try {
            await mongoServer.stop({ force: true, doCleanup: true });
        } catch (e) {}
    });

    test("get all instancecomparisons", async () => {
        const { setURI } = await import("../../../src/db");
        const { getAllInstanceComparisons } = await import("../../../src/db/models/instancecomparison");
        setURI(mongoServer.getUri());
        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(getAllInstanceComparisons(client)).resolves.toMatchObject(fixtureInstanceComparison);
    });

    test("drop collection instancomparisons", async () => {
        const { setURI } = await import("../../../src/db");
        const { dropInstanceComparison } = await import("../../../src/db/models/instancecomparison");
        setURI(mongoServer.getUri());

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(dropInstanceComparison(client)).resolves.not.toThrow();

        let collections = (await client.db(dbName).collections()).map((c) => c.collectionName);

        expect(collections).not.toContain(collectionName);
    });

    test("add two instance to instancecomparison collection", async () => {
        const { setURI } = await import("../../../src/db");
        const { addOneInstanceComparison } = await import("../../../src/db/models/instancecomparison");
        setURI(mongoServer.getUri());

        let testInstanceComparison: Partial<IInstanceComparison> = { name: "test3" };

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(addOneInstanceComparison(client, testInstanceComparison)).resolves.not.toThrow();

        await expect(client.db(dbName).collection(collectionName).findOne({ name: "test3" })).resolves.toMatchObject({
            name: "test3"
        });
    });

    test("remove an instance from instancecomparison collection", async () => {
        const { setURI } = await import("../../../src/db");
        const { removeInstanceComparison } = await import("../../../src/db/models/instancecomparison");
        setURI(mongoServer.getUri());

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(removeInstanceComparison(client, ["test1"])).resolves.not.toThrow();

        await expect(client.db(dbName).collection(collectionName).findOne({ name: "test1" })).resolves.toBe(null);
    });

    test("find InstanceComparisons based on category", async () => {
        const { setURI } = await import("../../../src/db");
        const { _findInstanceComparisons } = await import("../../../src/db/models/instancecomparison");
        setURI(mongoServer.getUri());

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(_findInstanceComparisons(client, "Compute")).resolves.toEqual([fixtureInstanceComparison[0]]);
    });
});
