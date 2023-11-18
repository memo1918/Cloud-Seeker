import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { FrameworkRequest } from "../../../../src/routing/route";
import { getAllCategories } from "../../../../src/businesslayer/category";

jest.mock("../../../../src/businesslayer/category");

describe("root route", () => {
    const { res, next, clearMockRes } = getMockRes();
    const errorMock = jest.fn(() => {
    });

    afterEach(() => {
        clearMockRes();
        errorMock.mockClear();
    });

    test("testing of instancecomparison get", async () => {
        (getAllCategories as jest.Mock<any>).mockReturnValue(["test"]);

        const Root = (await import("../../../../src/routing/routes/categories/get")).default;

        const req = getMockReq<FrameworkRequest>();

        let handler = new Root();

        await expect(handler.handle(req, res, next, errorMock)).resolves.toBe(undefined);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    categories: ["test"]
                }
            })
        );

        expect(res.contentType).toHaveBeenCalledWith("application/json");
        expect(res.end).toHaveBeenCalled();
        expect(errorMock).not.toHaveBeenCalled();
    });
});
