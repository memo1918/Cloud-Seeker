import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { IService } from "../../../src/db/models/services";

let dbName = "cloud-seeker";
let collectionName = "services";

//TODO: Functions getUniqueVendors(), createServicesIndex(), getDistinctVendors(), getDistinctUnits()
//TODO: and getDistinctUnitsGroupedByServiceFamily() are not tested @timo will do it thx timo UwU

describe("services db", () => {
    let mongoServer: MongoMemoryServer;
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

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
        } catch (e) {}

        let client = await new MongoClient(mongoServer.getUri()).connect();
        await client.db(dbName).collection(collectionName).insertMany(fixtureServices);
    });

    afterEach(async () => {
        try {
            await mongoServer.stop({ force: true, doCleanup: true });
        } catch (e) {}
    });

    test("find instances in collection services", async () => {
        const { setURI } = await import("../../../src/db");
        const { findServices } = await import("../../../src/db/models/services");
        setURI(mongoServer.getUri());
        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(findServices(client, ["123", "321"])).resolves.toMatchObject(fixtureServices);
    });

    test("drop collection services", async () => {
        const { setURI } = await import("../../../src/db");
        const { dropServices } = await import("../../../src/db/models/services");
        setURI(mongoServer.getUri());

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(dropServices(client)).resolves.not.toThrow();

        let collections = (await client.db(dbName).collections()).map((c) => c.collectionName);

        expect(collections).not.toContain(collectionName);
    });

    test("insert a instance to services collection", async () => {
        const { setURI } = await import("../../../src/db");
        const { insertServicesData } = await import("../../../src/db/models/services");
        setURI(mongoServer.getUri());

        let testService: Partial<IService>[] = [{ vendorName: "test3", sku: "69" }];

        let client = await new MongoClient(mongoServer.getUri()).connect();

        await expect(insertServicesData(client, testService)).resolves.not.toThrow();

        await expect(client.db(dbName).collection(collectionName).findOne({ sku: "69" })).resolves.toMatchObject({
            vendorName: "test3",
            sku: "69"
        });
    });
});
