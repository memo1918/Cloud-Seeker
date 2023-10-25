import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { Mappingservice} from "../../../mappingservice/mappingservice";

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

    let MS = new Mappingservice();

    let data = await MS.addMappings(["S2REJSCA5SBH5RBY","G65W9N34BXHEE7X5","DZH318Z0CSHB/Standard_E16-4ds_v4/b79c3e44-d17d-58a9-b1eb-da09ed48af83"]);

        res.contentType("application/json")
            .json({
                data: {
                    data
                }
            })
            .end();

        return Promise.resolve(undefined);
    }
}
