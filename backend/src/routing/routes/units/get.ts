import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { Units } from "../../../pricing/units";

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
        res.contentType("application/json")
            .json({
                data: Units.getInstance().getUnits()
            })
            .end();

        return Promise.resolve(undefined);
    }
}
