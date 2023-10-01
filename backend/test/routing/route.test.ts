import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { FrameworkRequest, FrameworkResponse, makeFramework } from "../../src/routing/route";
import { NextFunction } from "express";

describe("converting express route to framework route", () => {
    test("adding correlation id to params", () => {
        const req = getMockReq();
        const { res, next, clearMockRes } = getMockRes();
        let response: [FrameworkRequest, FrameworkResponse, NextFunction] | null;
        expect(() => (response = makeFramework(req, res, next))).not.toThrow();
        expect(req.params.correlationID).toMatch(
            /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        );
    });
    test("modify reference only", () => {
        const req = getMockReq();
        const { res, next, clearMockRes } = getMockRes();
        let response: [FrameworkRequest, FrameworkResponse, NextFunction] = [] as any;
        expect(() => (response = makeFramework(req, res, next))).not.toThrow();
        expect(response[0]).toEqual(req);
        expect(response[1]).toEqual(res);
        expect(response[2]).toEqual(next);
    });
});
