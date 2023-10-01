import { describe, expect, test } from "@jest/globals";
import { validMethods } from "../../src/routing/methods";

describe("valid http methods", () => {
    test("valid methods array to contain common methods", () => {
        expect(validMethods).toEqual(expect.arrayContaining(["get", "post", "patch", "delete", "options"]));
    });
});
