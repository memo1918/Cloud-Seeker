import { afterEach, beforeAll, beforeEach, describe, expect, test, jest } from "@jest/globals";

describe("getCategoryTemplate function test", () => {
    test("test getCategoryTemplate return", async () => {
        const { getCategoryTemplate } = await import("../../src/categories/categorytemplateread");

        expect(getCategoryTemplate()).not.toBeUndefined();
    });

    //TODO: wrong path error checking
});
