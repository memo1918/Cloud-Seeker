import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { Category } from "../../../src/interfaces/category.interface";

describe("categories db", () => {
    let mongoServer: MongoMemoryServer;
    let client: MongoClient;
    let fixtureCategories: Partial<Category>[] = [
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
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
            await mongoServer.ensureInstance();
        } catch (e) {}
        while (true) {
            try {
                client = await new MongoClient(mongoServer.getUri()).connect();
                await client.db("cloud-seeker").collection("categories").insertMany(fixtureCategories);
                break;
            } catch (err) {}
        }
    });

    afterEach(async () => {
        try {
            await client.close();
            await mongoServer.stop({ force: true, doCleanup: true });
        } catch (e) {}
    });

    test("get all categories with two instance available", async () => {
        const { _getAllCategories } = await import("../../../src/db/models/categories");

        await expect(_getAllCategories(client)).resolves.toMatchObject(fixtureCategories);
    });

    test("drop collection categories", async () => {
        const { dropCategories } = await import("../../../src/db/models/categories");

        await expect(dropCategories(client)).resolves.not.toThrow();

        let collections = (await client.db("cloud-seeker").collections()).map((c) => c.collectionName);

        expect(collections).not.toContain("categories");
    });

    test("add two instance to categories collection", async () => {
        const { addCategories } = await import("../../../src/db/models/categories");

        let testCategories: Partial<Category>[] = [
            {
                name: "test1"
            },
            {
                name: "test2"
            }
        ];

        await expect(addCategories(client, testCategories)).resolves.not.toThrow();

        await expect(
            client.db("cloud-seeker").collection("categories").findOne({ name: "test1" })
        ).resolves.toMatchObject({
            name: "test1"
        });
    });

    test("remove an instance from categories collection", async () => {
        const { removeCategories } = await import("../../../src/db/models/categories");

        await expect(removeCategories(client, ["Compute Instance"])).resolves.not.toThrow();

        await expect(
            client.db("cloud-seeker").collection("categories").findOne({ name: "Compute Instance" })
        ).resolves.toBe(null);
    });
});
