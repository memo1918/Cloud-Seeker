import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { MappingService } from "../../../mappingservice/mappingservice";
import { ReadCSV } from "../../../csvimport/readlinebyline";
import { MappingMongoDB } from "../../../mappingservice/mappingdb";
import { CategoryProvider } from "../../../categories/categoryprovider";

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
        let path = "../backend/src/dummyCsvImport.csv";
        let MS = new MappingService(new CategoryProvider(), new MappingMongoDB(), new ReadCSV(path));

        await MS.start();

        res.contentType("application/json").json({}).end();

        return Promise.resolve(undefined);
    }
}
