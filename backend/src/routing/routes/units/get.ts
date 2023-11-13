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
        let unitConverter = Units.getInstance();
        await unitConverter.ensureLoadAllUnits();

        res.contentType("application/json")
            .json({
                data: unitConverter.getUnits()
            })
            .end();

        return Promise.resolve(undefined);
    }
}
