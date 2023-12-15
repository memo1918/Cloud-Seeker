import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { FrameworkRequest } from "../../../../../src/routing/route";
import { findInstanceComparisons } from "../../../../../src/businesslayer/instancecomparisons";

jest.mock("../../../../../src/businesslayer/instancecomparisons");

describe("instancecomparison get", () => {
    const { res, next, clearMockRes } = getMockRes();
    const errorMock = jest.fn(() => {});

    afterEach(() => {
        clearMockRes();
        errorMock.mockClear();
    });

    test("testing of instancecomparison get", async () => {
        (findInstanceComparisons as jest.Mock<any>).mockReturnValue(["test"]);

        const Root = (await import("../../../../../src/routing/routes/categories/instancecomparisons/get")).default;

        const req = getMockReq<FrameworkRequest>({
            params: { categoryname: "Compute" }
        });

        let handler = new Root();

        await expect(handler.handle(req, res, next, errorMock)).resolves.toBe(undefined);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    InstanceComparisons: ["test"]
                }
            })
        );

        expect(res.contentType).toHaveBeenCalledWith("application/json");
        expect(res.end).toHaveBeenCalled();
        expect(errorMock).not.toHaveBeenCalled();
    });
});
