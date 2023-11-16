import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { MappingMongoDB } from "../../src/mappingservice/mappingdb";
import { execQuery } from "../../src/db";
import { SAMPLE_CATEGORY, SAMPLE_INSTANCECOMPARISON } from "./fixtures";

jest.mock("../../src/db");
jest.mock("../../src/db/models/services");

describe("MappingMongoDB class test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("test for findSkus function", async () => {
        const mappingDB = new MappingMongoDB();
        const skuArr = ["123", "345"];

        await mappingDB.findSkus(skuArr);
        expect(execQuery).toHaveBeenCalled();

        expect(execQuery).toHaveReturnedTimes(1);
    });

    test("test for findSkus function", async () => {
        const mappingDB = new MappingMongoDB();
        await mappingDB.pushCategories([SAMPLE_CATEGORY]);
        expect(execQuery).toHaveBeenCalled();
        expect(execQuery).toHaveReturned();
    });

    test("test for pushInstanceComparison function", async () => {
        const mappingDB = new MappingMongoDB();
        await mappingDB.pushInstanceComparison(SAMPLE_INSTANCECOMPARISON);
        expect(execQuery).toHaveBeenCalled();
        expect(execQuery).toHaveReturned();
    });

    test("test for dropInstanceComparison function", async () => {
        const mappingDB = new MappingMongoDB();
        await mappingDB.dropInstanceComparison();
        expect(execQuery).toHaveBeenCalled();
        expect(execQuery).toHaveReturned();
    });
});
