import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { FrameworkRequest } from "../../../../src/routing/route";
import Root from "../../../../src/routing/routes/[namedparameter]/get";

describe("root route", () => {
    const { res, next, clearMockRes } = getMockRes();
    const errorMock = jest.fn((error) => {});

    afterEach(() => {
        clearMockRes();
        errorMock.mockClear();
    });

    test("some dummy data request", async () => {
        const req = getMockReq<FrameworkRequest>({
            params: {
                correlationID: "662a9380-cf23-4584-bd29-5b543fd34e51",
                namedparameter: "test"
            }
        });
        let handler = new Root();

        await expect(handler.handle(req, res, next, errorMock)).resolves.toBe(undefined);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    helloWorld: { correlationID: "662a9380-cf23-4584-bd29-5b543fd34e51", namedparameter: "test" }
                }
            })
        );

        expect(res.contentType).toHaveBeenCalledWith("application/json");

        expect(res.end).toHaveBeenCalled();

        expect(errorMock).not.toHaveBeenCalled();
    });
});
