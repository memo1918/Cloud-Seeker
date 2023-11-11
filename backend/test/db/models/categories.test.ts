import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { ICategory } from "../../../src/db/models/categories";

describe("categories db", () => {
    let mongoServer: MongoMemoryServer;
    let fixtureCategories: Partial<ICategory>[] = [
        {
            name: "Compute Instance"
        },
        {
            name: "Storage"
        }
    ];

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
        } catch (e) {}

        let client = await new MongoClient(mongoServer.getUri()).connect();
        await client.db("cloud-seeker").collection("categories").insertMany(fixtureCategories);
    });

    afterEach(async () => {
        try {
            await mongoServer.stop({ force: true, doCleanup: true });
        } catch (e) {}
    });

    test("get all categories with two instance available", async () => {
        const { setURI } = await import("../../../src/db");
        const { getAllCategories } = await import("../../../src/db/models/categories");
        setURI(mongoServer.getUri());
        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(getAllCategories(client)).resolves.toMatchObject(fixtureCategories);
    });

    test("drop collection categories", async () => {
        const { setURI } = await import("../../../src/db");
        const { dropCategories } = await import("../../../src/db/models/categories");
        setURI(mongoServer.getUri());

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(dropCategories(client)).resolves.not.toThrow();

        let collections = (await client.db("cloud-seeker").collections()).map((c) => c.collectionName);

        expect(collections).not.toContain("categories");
    });

    test("add two instance to categories collection", async () => {
        const { setURI } = await import("../../../src/db");
        const { addCategories } = await import("../../../src/db/models/categories");
        setURI(mongoServer.getUri());

        let testCategories: Partial<ICategory>[] = [
            {
                name: "test1"
            },
            {
                name: "test2"
            }
        ];

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(addCategories(client, testCategories)).resolves.not.toThrow();

        await expect(
            client.db("cloud-seeker").collection("categories").findOne({ name: "test1" })
        ).resolves.toMatchObject({
            name: "test1"
        });
    });

    test("remove an instance from categories collection", async () => {
        const { setURI } = await import("../../../src/db");
        const { removeCategories } = await import("../../../src/db/models/categories");
        setURI(mongoServer.getUri());

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(removeCategories(client, ["Compute Instance"])).resolves.not.toThrow();

        await expect(
            client.db("cloud-seeker").collection("categories").findOne({ name: "Compute Instance" })
        ).resolves.toBe(null);
    });
});
