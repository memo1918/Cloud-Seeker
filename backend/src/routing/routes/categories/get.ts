import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { getAllCategories } from "../../../businesslayer/category";

// Purpose: Route for getting all categories.
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
        // get all categories from the database using the business layer
        let categories = await getAllCategories();
        // send the categories as json
        res.contentType("application/json")
            .json({
                data: {
                    categories: categories
                }
            })
            .end();

        // indicate that the request has been handled
        return Promise.resolve(undefined);
    }
}
