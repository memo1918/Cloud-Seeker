import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { MappingService } from "../../../mappingservice/mappingservice";
import { MappingMongoDB } from "../../../mappingservice/mappingdb";
import { CategoryProvider } from "../../../categories/categoryprovider";
import { ReadCSV } from "../../../csvimport/readcsv";
// delete this file
// Purpose: invoking logic for development purposes
// it can also be used to rerun the mappingservice
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
        // get all categories from the database using the business layer
        let path = process.env.DUMMY_CSV_IMPORT || "";
        let MS = new MappingService(new CategoryProvider(), new MappingMongoDB(), new ReadCSV(path));
        await MS.start();
        // send the result when done
        res.contentType("application/json")
            .json({
                Status: "Done"
                // result
            })
            .end();

        // indicate that the request has been handled
        return Promise.resolve(undefined);
    }
}
