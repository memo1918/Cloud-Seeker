import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../../route";
import { NextFunction } from "express";
import { execQuery } from "../../../../db";
import { findInstanceCompareSkus } from "../../../../db/models/instancecomparison";
import Joi from "joi";

// Purpose: Route for getting instance comparisons by skus.
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
        // data validation
        // validate the request body
        // the request body should be an array of arrays of strings aka string[][]
        const arraySchema = Joi.array().items(Joi.array().items(Joi.string()));
        // validate the request body
        const validationResults = arraySchema.validate(req.body);
        let result;
        if (validationResults.error) {
            // if the validation failed, send a 400 error
            result = {
                error: {
                    message: validationResults.error.message
                }
            };
            res.status(400);
        } else {
            // if the validation succeeded, get the instance comparisons from the database
            result = {
                data: {
                    InstanceComparisons: await execQuery(async (client) => {
                        return await findInstanceCompareSkus(client, req.body);
                    })
                }
            };
        }

        // send the result as json
        res.json(result).end();

        // indicate that the request has been handled
        return Promise.resolve(undefined);
    }
}
