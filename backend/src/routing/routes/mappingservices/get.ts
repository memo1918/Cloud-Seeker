import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { MappingService } from "../../../mappingservice/mappingservice";
import { MappingMongoDB } from "../../../mappingservice/mappingdb";
import { CategoryProvider } from "../../../categories/categoryprovider";
import { ReadCSV } from "../../../csvimport/readcsv";

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
        let path = process.env.DUMMY_CSV_IMPORT || "";
        let MS = new MappingService(new CategoryProvider(), new MappingMongoDB(), new ReadCSV(path));
        await MS.start();

        res.contentType("application/json")
            .json({
                Status: "Done"
            })
            .end();

        return Promise.resolve(undefined);
    }
}
