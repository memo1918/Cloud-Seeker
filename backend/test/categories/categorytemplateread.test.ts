import { describe, expect, test, jest } from "@jest/globals";
import { SAMPLE_CATEGORY_TEMPLATE } from "../mappingservice/fixtures";

jest.mock("fs")

describe("getCategoryTemplate function test", () => {

    test("test getCategoryTemplate return", async () => {
        const mockReadFileSync = jest.fn(()=> JSON.stringify(SAMPLE_CATEGORY_TEMPLATE));

        jest.spyOn(JSON, 'parse').mockImplementationOnce((input) => JSON.parse(input));

        const { getCategoryTemplate } = require("../../src/categories/categorytemplateread");
        expect(getCategoryTemplate(mockReadFileSync)).not.toBeUndefined();
    });

    //TODO: wrong path error checking
});
