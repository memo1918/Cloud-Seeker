import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { setURI } from "../../src/db";

describe("mongodb setup", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        try{
        mongoServer = await MongoMemoryServer.create();
        setURI(mongoServer.getUri());
        }catch(e){}
    });

    afterAll(async () => {
        try{
            await mongoServer.stop();
        }catch (e) {}
    });

    test("mongodb to connect and disconnect", async () => {
        const { execQuery } = require("../../src/db");

        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
        });

        await expect(executePing).resolves.not.toThrow();
    });

    test("mongodb to throw illegal uri error", async () => {
        const { execQuery, setURI } = require("../../src/db");
        setURI(mongoServer.getUri().substring(1));

        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
        });

        await expect(executePing).rejects.toBeInstanceOf(Error);
    });
    test("mongodb to throw missing uri error", async () => {
        const { execQuery, setURI } = require("../../src/db");
        setURI("");

        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
        });

        await expect(executePing).rejects.toBeInstanceOf(Error);
    });
    test("mongodb to throw timout error", async () => {
        const { execQuery, setURI } = require("../../src/db");
        setURI("mongodb://127.0.0.1:80");

        const executePing = execQuery(async (_client: any) => {
            const client: MongoClient = _client;
            await client.db("admin").command({ ping: 1 });
        });

        await expect(executePing).rejects.toBeInstanceOf(Error);
    });
});
