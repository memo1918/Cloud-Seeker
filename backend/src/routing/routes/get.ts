import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../route";
import { NextFunction } from "express";

export default class Root implements Route {
    getFileName(): string {
        return __filename;
    }

    handle(req: FrameworkRequest, res: FrameworkResponse, next: NextFunction, error: ErrorCallback): Promise<any> {
        res.contentType("application/json")
            .json({
                data: {
                    helloWorld: "helloWorld"
                }
            })
            .end();
        return Promise.resolve(undefined);
    }
}
