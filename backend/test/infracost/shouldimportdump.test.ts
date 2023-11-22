import { MongoMemoryServer } from "mongodb-memory-server";
import { Collection, Document, MongoClient } from "mongodb";
import { collectionName, dbName, IService } from "../../src/db/models/services";
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { getCollection } from "../../src/db/schema";
import { shouldimportdump } from "../../src/infracost/shouldimportdump";
import { execQuery } from "../../src/db";

jest.mock("../../src/db/schema");
jest.mock("../../src/db");

describe("function to decide if the db dum should be imported", () => {
    let mongoServer: MongoMemoryServer;
    let client: MongoClient;
    let fixtureServices: Partial<IService>[] = [
        {
            vendorName: "test1",
            sku: "123"
        },
        {
            vendorName: "test2",
            sku: "321"
        }
    ];

    let collection: Collection<Document>;

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
            await mongoServer.ensureInstance();
            client = await new MongoClient(mongoServer.getUri()).connect();
            collection = await client.db(dbName).createCollection(collectionName);
        } catch (e) {}

        (execQuery as jest.Mock<any>).mockImplementation((cb: (client: MongoClient) => void) => {
            return cb(client);
        });
        (getCollection as jest.Mock<any>).mockImplementation(async (...args: any[]) => {
            return collection;
        });
    });

    afterEach(async () => {
        try {
            await client.close();
            await mongoServer.stop({ force: true, doCleanup: true });
        } catch (e) {}
    });

    test("that dump should be imported", async () => {
        await expect(shouldimportdump()).resolves.toBeTruthy();
    });

    test("that dump should not be imported", async () => {
        await collection.insertMany([{ a: "b" }]);
        await expect(shouldimportdump()).resolves.not.toBeTruthy();
    });
});
