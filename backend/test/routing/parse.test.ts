import { describe, expect, test } from "@jest/globals";
import path from "path";
import { getExpressRoute } from "../../src/routing/parse";

describe("parse good cases", () => {
    const rootPath = __dirname;

    test("root path", () => {
        const routePath = path.join(rootPath, "get.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual(["get", "/"]);
    });

    test("sub-level path", () => {
        const routePath = path.join(rootPath, "test", "a", "sub", "path", "get.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual(["get", "/test/a/sub/path"]);
    });

    test("path with one param path", () => {
        const routePath = path.join(rootPath, "test", "with_", "[parameter]", "get.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual(["get", "/test/with_/:parameter"]);
    });

    test("path with multiple params", () => {
        const routePath = path.join(rootPath, "test", "multiple", "[parameter1]", "subpath", "[parameter3]", "get.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual([
            "get",
            "/test/multiple/:parameter1/subpath/:parameter3"
        ]);
    });

    test("path with get", () => {
        const routePath = path.join(rootPath, "test", "get.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual(["get", "/test"]);
    });

    test("path with post", () => {
        const routePath = path.join(rootPath, "test", "post.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual(["post", "/test"]);
    });

    test("path with patch", () => {
        const routePath = path.join(rootPath, "test_", "patch.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual(["patch", "/test_"]);
    });

    test("path with delete", () => {
        const routePath = path.join(rootPath, "test", "delete.ts");
        expect(getExpressRoute(rootPath, routePath)).toStrictEqual(["delete", "/test"]);
    });
});

describe("parse bad cases", () => {
    const rootPath = __dirname;

    test("invalid method", () => {
        const routePath = path.join(rootPath, "geet.ts");
        expect(() => getExpressRoute(rootPath, routePath)).toThrow("invalid method exception");
        expect(() => getExpressRoute(rootPath, routePath)).toThrow(/geet/);
    });
    test("invalid parameter name", () => {
        const routePath = path.join(rootPath, "test", "with", "[parameter]]", "get.ts");
        expect(() => getExpressRoute(rootPath, routePath)).toThrow(/invalid parameter name exception/);
        expect(() => getExpressRoute(rootPath, routePath)).toThrow("parameter]");
    });
    test("invalid path ", () => {
        const routePath = path.join(rootPath, "test", "multiple", "[parameter1]", "subp.ath", "[parameter3]", "get.ts");
        expect(() => getExpressRoute(rootPath, routePath)).toThrow(/invalid pathname exception/);
        expect(() => getExpressRoute(rootPath, routePath)).toThrow("subp.ath");
    });
});
