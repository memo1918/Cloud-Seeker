import { describe, expect, test, jest, beforeAll } from "@jest/globals";
import { setupRoutingRegisterMock } from "../setups/routing.routes.register";
import { setupExpressSetupMock } from "../setups/express.setup";
import { registerRoutes } from "../src/routing/register";
import { startServer } from "../src/express/setup";

beforeAll(setupRoutingRegisterMock);
beforeAll(setupExpressSetupMock);
beforeAll(() => {
    jest.clearAllMocks();
});

describe("test main entry point", () => {
    test("if server is starting", async () => {
        const { registerRoutes } = await import("../src/routing/register");
        const { startServer } = await import("../src/express/setup");
        await import("../src/index");

        expect(registerRoutes).toBeCalled();
        expect(startServer).toBeCalled();
    });
});
