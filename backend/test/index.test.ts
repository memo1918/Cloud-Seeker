import { describe, expect, test, jest, beforeAll, beforeEach, afterEach } from "@jest/globals";
import { setupRoutingRegisterMock } from "../setups/routing.routes.register";
import { setupExpressSetupMock } from "../setups/express.setup";

import { setupDbIndexMock } from "../setups/db.index";
import { MongoMemoryServer } from "mongodb-memory-server";
import { loadinfracostdumpindb } from "../src/infracost/loadinfracostdumpindb";

beforeAll(setupRoutingRegisterMock);
beforeAll(setupExpressSetupMock);
beforeAll(setupDbIndexMock);
jest.mock("../src/infracost/loadinfracostdumpindb");
beforeEach(() => {
    jest.clearAllMocks();
});

describe("test main entry point", () => {
    let mongoServer: MongoMemoryServer;

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
        } catch (e) {}
        (loadinfracostdumpindb as jest.Mock<any>).mockResolvedValue(undefined);
    });

    afterEach(async () => {
        try {
            await mongoServer.stop();
        } catch (e) {}
    });

    test("if server is starting", async () => {
        const { registerRoutes } = await import("../src/routing/register");
        const { startServer } = await import("../src/express/setup");
        const { setupDB } = await import("../src/db/index");

        await import("../src/index");
        expect(loadinfracostdumpindb).toBeCalled();
        expect(registerRoutes).toBeCalled();
        expect(startServer).toBeCalled();
        expect(setupDB).toBeCalled();
    });
});
