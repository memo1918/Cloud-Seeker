import {afterEach, beforeEach, describe, expect, jest, test} from "@jest/globals";
import {MongoMemoryServer} from "mongodb-memory-server";
import {connectClient} from "../../src/db";


describe("mongodb connection issues", () => {
    test("mongodb to not connect", async () => {
        process.env["DB_CONNECTION_STRING"] = "mongodb://127.0.0.1:80";
        const {connectClient} = require("../../src/db");
        await expect(connectClient()).rejects.toThrow();
    });
});