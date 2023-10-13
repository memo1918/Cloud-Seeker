import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

describe("mongodb setup", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
        } catch (e) {}
    });

    afterAll(async () => {
        await mongoServer.stop({ force: true, doCleanup: true });
    });

    test("mongodb to connect and disconnect", async () => {
        const { execQuery } = require("../../src/db");

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
        });

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
    test("mongodb to throw timout error", async () => {
        const { execQuery, setupDB } = await import("../../src/db");
        setupDB("mongodb://127.0.0.1:80");

        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
            return true;
        });

        await expect(executePing).rejects.toBeInstanceOf(Error);
    });
});
