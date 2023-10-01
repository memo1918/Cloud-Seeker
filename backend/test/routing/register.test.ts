import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
jest.dontMock("../../src/routing/routeregister.ts");

describe("register module", () => {
    let { registerRoutes, routes } = <typeof import("../../src/routing/register")>{};

    beforeEach(async () => {
        jest.resetModules();
        let module = await import("../../src/routing/register");
        registerRoutes = module.registerRoutes;
        routes = module.routes;
    });

    test("initial object to be empty", () => {
        expect(routes.getRoutes()).toMatchObject({});
    });
    test("registering routes", async () => {
        expect(registerRoutes).not.toThrow();
        expect(Object.keys(routes.getRoutes()).length).toBeGreaterThan(0);
    });
    test("registering routes duplicate", async () => {
        expect(registerRoutes).not.toThrow();
        expect(registerRoutes).toThrow();
    });
});
