import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { MappingService } from "../../../mappingservice/mappingservice";
import { MappingMongoDB } from "../../../mappingservice/mappingdb";
import { CategoryProvider } from "../../../categories/categoryprovider";
import {ReadCSV} from "../../../csvimport/readcsv";

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

        // let data = await MS.addMappings([
        //     "S2REJSCA5SBH5RBY",
        //     "G65W9N34BXHEE7X5",
        //     "DZH318Z0CSHB/Standard_E16-4ds_v4/b79c3e44-d17d-58a9-b1eb-da09ed48af83"
        // ]);

        res.contentType("application/json")
            .json({
                data: {}
            })
            .end();

        return Promise.resolve(undefined);
    }
}
