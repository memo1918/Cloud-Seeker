import { afterAll, afterEach, beforeAll, describe, expect, jest, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { FrameworkRequest } from "../../../src/routing/route";
import { setupWebSiteVisitsMock } from "../../../setups/db.models.websitevisits";

beforeAll(setupWebSiteVisitsMock);
afterAll(() => {
    jest.clearAllMocks();
});

describe("root route", () => {
    const { res, next, clearMockRes } = getMockRes();
    const errorMock = jest.fn(() => {});

    afterEach(() => {
        clearMockRes();
        errorMock.mockClear();
    });

    test("some dummy data request", async () => {
        const Root = (await import("../../../src/routing/routes/get")).default;
        const { getVisits } = await import("../../../src/db/models/websitevisits");
        const req = getMockReq<FrameworkRequest>({
            params: { correlationID: "662a9380-cf23-4584-bd29-5b543fd34e51" }
        });
        let handler = new Root();

        await expect(handler.handle(req, res, next, errorMock)).resolves.toBe(undefined);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                data: { visitors: 5 }
            })
        );

        expect(res.contentType).toHaveBeenCalledWith("application/json");

        expect(res.end).toHaveBeenCalled();

        expect(errorMock).not.toHaveBeenCalled();

        expect(getVisits).toBeCalled();
    });
});
