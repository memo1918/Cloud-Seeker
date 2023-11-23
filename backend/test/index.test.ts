import { afterEach, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { setupRoutingRegisterMock } from "../setups/routing.routes.register";
import { setupExpressSetupMock } from "../setups/express.setup";

import { setupDbIndexMock } from "../setups/db.index";
import { MongoMemoryServer } from "mongodb-memory-server";
import { loadinfracostdumpindb } from "../src/infracost/loadinfracostdumpindb";
import { runMappingService } from "../src/mappingservice/runmappingservice";

beforeAll(setupRoutingRegisterMock);
beforeAll(setupExpressSetupMock);
beforeAll(setupDbIndexMock);
jest.mock("../src/infracost/loadinfracostdumpindb");
jest.mock("../src/mappingservice/mappingservice");
jest.mock("../src/mappingservice/runmappingservice");
beforeEach(() => {
    jest.clearAllMocks();
});

describe("test main entry point", () => {
    let mongoServer: MongoMemoryServer;

    beforeEach(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
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
        const { setupDB, waitForDB } = await import("../src/db/index");

        await import("../src/index");

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(runMappingService).toBeCalled();
        expect(waitForDB).toBeCalled();
        expect(loadinfracostdumpindb).toBeCalled();
        expect(registerRoutes).toBeCalled();
        expect(startServer).toBeCalled();
        expect(setupDB).toBeCalled();
    });
});
