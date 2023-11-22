import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { getAllCategories } from "../../../businesslayer/category";

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
        let categories = await getAllCategories();

        res.contentType("application/json")
            .json({
                data: {
                    categories: categories
                }
            })
            .end();

        return Promise.resolve(undefined);
    }
}
