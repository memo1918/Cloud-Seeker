import { beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { RouteRegister } from "../../src/routing/routeregister";
import { setupExpressMock } from "../../setups/express";
import express, { Application } from "express";
import path from "path";
import { Route } from "../../src/routing/route";
import { getMockReq, getMockRes } from "@jest-mock/express";

beforeAll(setupExpressMock);

function last(arr: any[]) {
    return arr[arr.length - 1];
}
describe("RouteRegister test cases", () => {
    let app: Application;

    let appSpies: Application;

    class DummyRoute_test_name_get implements Route {
        public static instance: DummyRoute_test_name_get | null;

        constructor() {
            DummyRoute_test_name_get.instance = this;
        }

        getFileName = jest.fn(() => path.join(__dirname, "test", "[name]", "get.ts"));

        handle = jest.fn((...args: any[]) => {
            return Promise.resolve();
        });
    }

    class DummyRoute_test_name_post implements Route {
        public static instance: DummyRoute_test_name_post | null;

        constructor() {
            DummyRoute_test_name_post.instance = this;
        }

        getFileName = jest.fn(() => path.join(__dirname, "test", "[name]", "post.ts"));

        handle = jest.fn((...args: any[]) => {
            return Promise.resolve();
        });
    }

    class DummyRoute_test_post implements Route {
        public static instance: DummyRoute_test_post | null;

        constructor() {
            DummyRoute_test_post.instance = this;
        }

        getFileName = jest.fn(() => path.join(__dirname, "test", "post.ts"));

        handle = jest.fn((...args: any[]) => {
            return Promise.resolve();
        });
    }

    beforeEach(() => {
        jest.clearAllMocks();

        app = express();
        appSpies = <Application>{};
        for (const appKey in app) {
            // @ts-ignore
            if (typeof app[appKey] != "function") continue;
            // @ts-ignore
            appSpies[appKey] = jest.spyOn(app, appKey);
        }

        DummyRoute_test_name_get.instance = null;
        DummyRoute_test_name_post.instance = null;
        DummyRoute_test_post.instance = null;
    });

    class ThrowingRoute_test_name_get implements Route {
        public static instance: DummyRoute_test_name_get | null;

        constructor() {
            DummyRoute_test_name_get.instance = this;
        }

        getFileName = jest.fn(() => path.join(__dirname, "test", "[name]", "get.ts"));

        handle = jest.fn((...args: any[]) => {
            throw new Error("Dummy Error");
        });
    }

    class ThrowingObjectRoute_test_name_get implements Route {
        public static instance: DummyRoute_test_name_get | null;

        constructor() {
            DummyRoute_test_name_get.instance = this;
        }

        getFileName = jest.fn(() => path.join(__dirname, "test", "[name]", "get.ts"));

        handle = jest.fn((...args: any[]) => {
            throw "an object error";
        });
    }

    test("creating a new RouteRegister", () => {
        expect(() => {
            const register = new RouteRegister(app, __dirname);
        }).not.toThrow();
    });

    test("adding a new route", () => {
        const register = new RouteRegister(app, __dirname);

        expect(() => register.register({ default: DummyRoute_test_name_get })).not.toThrow();

        expect(register.getRoutes()).toMatchObject({
            "/test/:name": { get: DummyRoute_test_name_get }
        });
    });

    test("adding a duplicate route", () => {
        const register = new RouteRegister(app, __dirname);

        expect(() => register.register({ default: DummyRoute_test_name_get })).not.toThrow();
        expect(() => register.register({ default: DummyRoute_test_name_get })).toThrow();

        expect(register.getRoutes()).toMatchObject({
            "/test/:name": { get: DummyRoute_test_name_get }
        });
    });

    test("adding multiple routes", () => {
        const register = new RouteRegister(app, __dirname);

        expect(() => register.register({ default: DummyRoute_test_name_get })).not.toThrow();
        expect(() => register.register({ default: DummyRoute_test_name_post })).not.toThrow();
        expect(() => register.register({ default: DummyRoute_test_post })).not.toThrow();

        expect(register.getRoutes()).toMatchObject({
            "/test/:name": { get: DummyRoute_test_name_get, post: DummyRoute_test_name_post },
            "/test": { post: DummyRoute_test_post }
        });
    });

    test("access to path of instance", () => {
        const register = new RouteRegister(app, __dirname);
        expect(() => register.register({ default: DummyRoute_test_name_get })).not.toThrow();
        expect(DummyRoute_test_name_get.instance?.getFileName).toBeCalled();
    });

    test("registration on app", () => {
        const register = new RouteRegister(app, __dirname);
        expect(() => register.register({ default: DummyRoute_test_name_get })).not.toThrow();
        expect(appSpies.get).toBeCalled();
        expect(appSpies.get).toBeCalledWith("/test/:name", expect.anything());
    });

    test("a request to call the handle of the route", async () => {
        const register = new RouteRegister(app, __dirname);
        expect(() => register.register({ default: DummyRoute_test_post })).not.toThrow();
        const { res, next, clearMockRes } = getMockRes();
        const req = getMockReq();
        await last(app._router.stack[2].route.stack).handle(req, res, next);

        expect(req.params.correlationID).toBeTruthy();
        expect(DummyRoute_test_post.instance?.handle).toBeCalledWith(req, res, next, expect.anything());
    });

    test("if a new route handler instance is created for each call", async () => {
        const register = new RouteRegister(app, __dirname);
        expect(() => register.register({ default: DummyRoute_test_post })).not.toThrow();
        const { res, next, clearMockRes } = getMockRes();

        const req1 = getMockReq();
        await last(app._router.stack[2].route.stack).handle(req1, res, next);
        const firstInstance = DummyRoute_test_post.instance;

        clearMockRes(); // reuse response

        const req2 = getMockReq();
        await last(app._router.stack[2].route.stack).handle(req2, res, next);
        const secondInstance = DummyRoute_test_post.instance;

        expect(secondInstance).not.toEqual(firstInstance);
    });

    test("error handling when executing a route", async () => {
        const register = new RouteRegister(app, __dirname);
        expect(() => register.register({ default: ThrowingRoute_test_name_get })).not.toThrow();
        const { res, next, clearMockRes } = getMockRes();

        const req1 = getMockReq();
        await last(app._router.stack[2].route.stack).handle(req1, res, next);

        expect(next).toBeCalled();
    });

    test("error handling when throwing any object", async () => {
        const register = new RouteRegister(app, __dirname);
        expect(() => register.register({ default: ThrowingObjectRoute_test_name_get })).not.toThrow();
        const { res, next, clearMockRes } = getMockRes();

        const req1 = getMockReq();
        await last(app._router.stack[2].route.stack).handle(req1, res, next);

        expect(next).toBeCalled();
    });
});
