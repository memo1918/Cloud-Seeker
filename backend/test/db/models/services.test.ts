import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import {
    collectionName,
    createServicesIndex,
    dbName,
    dropServices,
    getDistinctUnitsGroupedByServiceFamily
} from "../../../src/db/models/services";
import { distinctSkus, skuFixture } from "./skuFixture";
import { getCollection } from "../../../src/db/schema";
import _ from "lodash";

jest.mock("../../../src/db/schema");

describe("services module", () => {
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

    test("that the service collection is dropped", async () => {
        let client = await new MongoClient(mongoServer.getUri()).connect();

        await client.db(dbName).createCollection(collectionName);

        let collectionsBeforeDelete = (await client.db("website").collections()).map((c) => c.collectionName);

        expect(collectionsBeforeDelete).toContain(collectionName);

        await expect(dropServices(client)).resolves.toBeTruthy();

        let collectionsAfterDelete = (await client.db("website").collections()).map((c) => c.collectionName);

        expect(collectionsAfterDelete).not.toContain(collectionName);
        await client.close();
    });

    test("that a index for the sku is created", async () => {
        let client = await new MongoClient(mongoServer.getUri()).connect();

        await client.db(dbName).createCollection(collectionName);

        await expect(createServicesIndex(client)).resolves.toBeTruthy();

        await expect(client.db(dbName).collection(collectionName).indexExists("sku")).resolves.toBeTruthy();
        await client.close();
    });

    test("that distinct pricing units for each service family are returned", async () => {
        let client = await new MongoClient(mongoServer.getUri()).connect();
        await client.db(dbName).createCollection(collectionName);
        await client.db(dbName).collection(collectionName).insertMany(skuFixture);
        (getCollection as jest.Mock<any>).mockImplementation((...args: any[]) => {
            return Promise.resolve(client.db(dbName).collection(collectionName));
        });

        await expect(
            (async () => {
                let data = await getDistinctUnitsGroupedByServiceFamily(client);
                return _.isEqual(data, distinctSkus);
            })()
        ).resolves.toBeTruthy();

        await client.close();
    });
});
