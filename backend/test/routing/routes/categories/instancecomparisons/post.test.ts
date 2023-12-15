import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { FrameworkRequest } from "../../../../../src/routing/route";
import { findInstanceComparisonSkus } from "../../../../../src/businesslayer/instancecomparisons";

jest.mock("../../../../../src/businesslayer/instancecomparisons");

describe("instancecomparison post", () => {
    const { res, next, clearMockRes } = getMockRes();
    const errorMock = jest.fn(() => {});

    afterEach(() => {
        clearMockRes();
        errorMock.mockClear();
    });

    test("testing of instancecomparison post", async () => {
        (findInstanceComparisonSkus as jest.Mock<any>).mockReturnValue(["test"]);

        const Root = (await import("../../../../../src/routing/routes/categories/instancecomparisons/post")).default;

        const req = getMockReq<FrameworkRequest>({
            body: [
                [
                    "DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1",
                    "FW8E5RQ44WYXEWXN",
                    "generated-n2-highcpu-8"
                ]
            ]
        });

        let handler = new Root();

        await expect(handler.handle(req, res, next, errorMock)).resolves.toBe(undefined);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    result: ["test"]
                }
            })
        );

        expect(res.contentType).toHaveBeenCalledWith("application/json");
        expect(res.end).toHaveBeenCalled();
        expect(errorMock).not.toHaveBeenCalled();
    });
});
