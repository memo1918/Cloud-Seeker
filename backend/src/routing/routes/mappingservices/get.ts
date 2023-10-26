import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { MappingService } from "../../../mappingservice/mappingService";

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
        let MS = new MappingService();

        await MS.forEachSku();

        res.contentType("application/json").json({}).end();

        return Promise.resolve(undefined);
    }
}
