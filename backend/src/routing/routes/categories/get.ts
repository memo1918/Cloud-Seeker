import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { execQuery } from "../../../db";
import { getAllCategories, ICategory } from "../../../db/models/categories";

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
        let categories = await execQuery<ICategory[]>(getAllCategories);

        //
        // await new Promise<number>((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(10);
        //     }, 1000);
        //     reject() // throw new Error(lkjhfkgh<l)
        // });

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
