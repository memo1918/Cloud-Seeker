import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../../route";
import { NextFunction } from "express";
import { execQuery } from "../../../../db";
import { findInstanceCompareSkus } from "../../../../db/models/instancecomparison";
import Joi from "joi";

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

        const arraySchema = Joi.array().items(Joi.array().items(Joi.string()));
        const validationResults = arraySchema.validate(req.body);
        let result;
        if (validationResults.error) {
            result = {
                error: {
                    message: validationResults.error.message
                }
            };
            res.status(400);
        } else {
            result = {
                data: {
                    InstanceComparisons: await execQuery(async (client) => {
                        return await findInstanceCompareSkus(client, req.body);
                    })
                }
            };
        }

        res.json(result).end();

        return Promise.resolve(undefined);
    }
}
