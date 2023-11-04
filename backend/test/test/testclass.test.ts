import { beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { setupotherfnmock } from "../../setups/test.otherfn";

beforeAll(setupotherfnmock);
beforeEach(() => {
    jest.clearAllMocks();
});
describe("test testclass", () => {
    test("testclass is returning the correct thing when accessing direct data", async () => {
        const { TestClass } = await import("../../src/test/testclass");

        const instance = new TestClass();

        expect(instance.getData()).toEqual({
            "1": 2,
            "3": 4,
            "5": 6
        });
    });

    test("testclass is returning the correct thing when accessing data with callback", async () => {
        const { TestClass } = await import("../../src/test/testclass");

        const instance = new TestClass();

        const callback = jest.fn((data) => [5, 6, 7, 8]);

        expect(instance.getDataFromCallback(callback)).toEqual([5, 6, 7, 8]);

        expect(callback).toBeCalled();
        expect(callback).toBeCalledWith({
            "1": 2,
            "3": 4,
            "5": 6
        });
    });

    test("testclass is returning the correct thing when accessing data from other module", async () => {
        const { TestClass } = await import("../../src/test/testclass");
        const { mySpecialFunction } = await import("../../src/test/otherfn");
        const instance = new TestClass();

        let mySpecialFunctionMock = mySpecialFunction as jest.Mock<() => string>;

        mySpecialFunctionMock.mockReturnValue("Timo");

        expect(instance.getDataFromOtherModule()).toContain("Timo");
    });

    test("testclass is returning the correct thing when validating data from other module", async () => {
        const { TestClass } = await import("../../src/test/testclass");
        const { mySpecialFunction } = await import("../../src/test/otherfn");
        const instance = new TestClass();

        let mySpecialFunctionMock = mySpecialFunction as jest.Mock<() => string>;

        mySpecialFunctionMock.mockReturnValue("Timo");

        expect(instance.getDataFromOtherModule2()).toEqual("Allow");

        mySpecialFunctionMock.mockReturnValue("Mehmet");

        expect(instance.getDataFromOtherModule2()).toEqual("Deny");
    });
});
