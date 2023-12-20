import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../../route";
import { NextFunction } from "express";
import { URL } from "url";
import { findInstanceComparisons } from "../../../../businesslayer/instancecomparisons";
import { InstanceComparison } from "../../../../interfaces/instancecomparison.interface";

// Purpose: Route for getting instance comparisons.
// This route is used to get instance comparisons for a category.
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
        // get the category name from the url
        let url = new URL(req.originalUrl, "https://localhost");
        let categoryName = url.searchParams.get("categoryname") || "";
        // get the instance comparisons for the category by using the business layer and getting those from the database
        let instanceComparisons: InstanceComparison[] = await findInstanceComparisons(categoryName);
        // send the instance comparisons as json
        res.contentType("application/json")
            .json({
                data: {
                    InstanceComparisons: instanceComparisons
                }
            })
            .end();
        // indicate that the request has been handled
        return Promise.resolve(undefined);
    }
}
