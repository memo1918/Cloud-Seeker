import { describe, expect, test } from "@jest/globals";
import path from "path";
import { ROUTE_ROOT_PATH } from "../../../src/routing/routes/routeroot";

describe("valid path", () => {
    test("if constant is a path", () => {
        expect(path.isAbsolute(ROUTE_ROOT_PATH)).toBe(true);
        expect(path.basename(ROUTE_ROOT_PATH)).not.toContain(".");
    });
});
