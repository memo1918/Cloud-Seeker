import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../route";
import { NextFunction } from "express";
import { getVisits } from "../../db/models/websitevisits";

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
        let visits = await getVisits("/api");

        res.contentType("application/json")
            .json({
                data: {
                    visitors: visits
                }
            })
            .end();

        return Promise.resolve(undefined);
    }
}
