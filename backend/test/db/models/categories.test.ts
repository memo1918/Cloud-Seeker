import {afterEach, beforeEach, describe, expect, test} from "@jest/globals";
import {MongoMemoryServer} from "mongodb-memory-server";

describe("categories module", () => {
    let mongoServer: MongoMemoryServer;

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
        } catch (e) {
        }
    });

    afterEach(async () => {
        try {
            await mongoServer.stop({force: true, doCleanup: true});
        } catch (e) {
        }
    });

});