import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

describe("mongodb setup", () => {
    let mongoServer: MongoMemoryServer;
    let client: MongoClient;
    beforeAll(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
            await mongoServer.ensureInstance();
            client = await new MongoClient(mongoServer.getUri()).connect();
        } catch (e) {}
    });

    afterAll(async () => {
        await mongoServer.stop({ force: true, doCleanup: true });
    });

    test("mongodb to connect and disconnect", async () => {
        const { execQuery, setupDB } = require("../../src/db");
        setupDB(mongoServer.getUri());
        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
            return true;
        });

        await expect(executePing).resolves.toBe(true);
    });

    test("mongodb to throw illegal uri error", async () => {
        const { execQuery, setupDB } = await import("../../src/db");
        setupDB(mongoServer.getUri().substring(1));

        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
            return true;
        }, 500);

        await expect(executePing).rejects.toBeInstanceOf(Error);
    });
    test("mongodb to throw missing uri error", async () => {
        const { execQuery, setupDB } = await import("../../src/db");
        setupDB("");

        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
            return true;
        });

        await expect(executePing).rejects.toBeInstanceOf(Error);
    });
});
