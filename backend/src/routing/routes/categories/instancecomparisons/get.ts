import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../../route";
import express, { NextFunction } from "express";
import { URL } from "url";
import { findInstanceComparisons } from "../../../../businesslayer/instancecomparisons";
import { InstanceComparison } from "../../../../interfaces/instancecomparison.interface";

export default class Root implements Route {
    getFileName(): string {
        return __filename;
    }

    async handle(
        req: FrameworkRequest,
        res: FrameworkResponse,
        next: NextFunction,
        error: ErrorCallback
    ): Promise<any> {
        let url = new URL(req.originalUrl, "https://localhost");
        let categoryName = url.searchParams.get("categoryname") || "";
        let instanceComparisons: InstanceComparison[] = await findInstanceComparisons(categoryName);

        res.contentType("application/json")
            .json({
                data: {
                    InstanceComparisons: instanceComparisons
                }
            })
            .end();

        return Promise.resolve(undefined);
    }
}
