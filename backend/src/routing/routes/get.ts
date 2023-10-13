import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../route";
import { NextFunction } from "express";

export default class Root implements Route {
    getFileName(): string {
        return __filename;
    }
    public static counter = 0;
    handle(req: FrameworkRequest, res: FrameworkResponse, next: NextFunction, error: ErrorCallback): Promise<any> {
        res.contentType("application/json")
            .json({
                data: {
                    visitors: Root.counter++
                }
            })
            .end();
        return Promise.resolve(undefined);
    }
}
