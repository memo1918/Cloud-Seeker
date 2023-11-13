import {
    _getDistinctUnitsGroupedByServiceFamily,
    collectionName,
    createServicesIndex,
    dbName,
    dropServices,
    findServices,
    insertServicesData,
    IService
} from "../../../src/db/models/services";

import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Collection, Document, MongoClient } from "mongodb";

import { distinctSkus, skuFixture } from "./skuFixture";
import { getCollection } from "../../../src/db/schema";
import * as _ from "lodash";

jest.mock("../../../src/db/schema");

describe("services db", () => {
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
            client = await new MongoClient(mongoServer.getUri()).connect();
            collection = await client.db(dbName).createCollection(collectionName);
        } catch (e) {}

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

    test("find instances in collection services", async () => {
        await client.db(dbName).collection(collectionName).insertMany(fixtureServices);
        await expect(findServices(client, ["123", "321"])).resolves.toMatchObject(fixtureServices);
    });

    test("insert a instance to services collection", async () => {
        let testService: Partial<IService>[] = [{ vendorName: "test3", sku: "69" }];

        await collection.insertMany(fixtureServices);

        await expect(insertServicesData(client, testService)).resolves.not.toThrow();

        await expect(client.db(dbName).collection(collectionName).findOne({ sku: "69" })).resolves.toMatchObject({
            vendorName: "test3",
            sku: "69"
        });
    });

    test("that the service collection is dropped", async () => {
        let collectionsBeforeDelete = (await client.db(dbName).collections()).map((c) => c.collectionName);
        expect(collectionsBeforeDelete).toContain(collectionName);

        await expect(dropServices(client)).resolves.toBeTruthy();

        let collectionsAfterDelete = (await client.db(dbName).collections()).map((c) => c.collectionName);
        expect(collectionsAfterDelete).not.toContain(collectionName);
    });

    test("that a index for the sku is created", async () => {
        await expect(createServicesIndex(client)).resolves.toBeTruthy();

        let test = await collection.listIndexes().toArray();

        await expect(collection.indexExists("sku_text")).resolves.toBeTruthy();
    });

    test("that distinct pricing units for each service family are returned", async () => {
        await client.db(dbName).collection(collectionName).insertMany(skuFixture);

        await expect(
            (async () => {
                let data = await _getDistinctUnitsGroupedByServiceFamily(client);
                // data[0].
                data = data.sort((a, b) => a._id.localeCompare(b._id));
                data[0].units = data[0].units.sort();
                data[1].units = data[1].units.sort();
                return _.isEqual(data, distinctSkus);
            })()
        ).resolves.toBeTruthy();
    });
});
