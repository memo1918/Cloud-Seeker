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
        // add visit to database
        // this is done by the frontend to view the amount of visitors on the website
        // this logic should be added in other routes to be able to perform analytics
        let visits = await getVisits("/api");

        // send the visits as json
        res.contentType("application/json")
            .json({
                data: {
                    visitors: visits
                }
            })
            .end();

        // indicate that the request has been handled
        return Promise.resolve(undefined);
    }
}
