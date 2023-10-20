import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { getVisits } from "../../../db/models/websitevisits";
import { addCategories, getAllCategories, ICategory, removeCategories } from "../../../db/models/categories";
import { execQuery } from "../../../db";

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
        // data validation
        // execute sm fn in business layer

        let body: { categories: string[] } = req.body;

        const categories = await execQuery(async (client)=> {
            await removeCategories(client, body.categories);
            return await getAllCategories(client);
        });

        res.contentType("application/json")
            .json({
                data: {
                    categories
                }
            })
            .end();

        return Promise.resolve(undefined);
    }
}
