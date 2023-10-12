import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("mongodb setup", () => {
    let mongoServer: MongoMemoryServer;

    beforeEach(async () => {
        mongoServer = await MongoMemoryServer.create();
        process.env["DB_CONNECTION_STRING"] = mongoServer.getUri();
    });

    afterEach(async () => {
        await mongoServer.stop({ force: true, doCleanup: true });
    });

    test("mongodb to connect and disconnect", async () => {
        const { connectClient, disconnectClient } = require("../../src/db");
        await expect(connectClient()).resolves.not.toThrow();
        await expect(disconnectClient()).resolves.not.toThrow();
    });
});
