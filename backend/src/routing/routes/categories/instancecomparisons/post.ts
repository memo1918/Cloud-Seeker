import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../../route";
import { NextFunction } from "express";
import { execQuery } from "../../../../db";
import { _findInstanceCompareSkus } from "../../../../db/models/instancecomparison";
import Joi, { object } from "joi";
import { findInstanceComparisonSkus } from "../../../../businesslayer/instancecomparisons";

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
        // execute sm fn in business layer

        let arr = [
            [
                "DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1",
                "FW8E5RQ44WYXEWXN",
                "generated-n2-highcpu-8"
            ],
            [
                "DZH318Z0BPSQ/Standard_DS12_v2_Promo/3e6b5981-3940-5f0d-ae89-9f674e523789",
                "YKJ7QMTD3S8TRDFV",
                "generated-e2-standard-16"
            ],
            [
                "DZH318Z093WX/Standard_E16-8ads_v5/787dcb18-6b37-56d6-a423-66df0995bd5c",
                "N6EWMSZM6ZT5AB8X",
                "generated-n1-highmem-96"
            ]
        ];
        const Joi = require("joi");
        const arraySchema = Joi.array().items(Joi.array().items(Joi.string()));
        const validationResults = arraySchema.validate(req.body);
        let result;

        if (validationResults.error) {
            result = {
                error: {
                    message: "Data validation error"
                }
            };

            res.status(404);
        } else {
            result = await findInstanceComparisonSkus(req.body);
        }

        res.contentType("application/json")
            .json({
                data: {
                    result
                }
            })
            .end();

        return Promise.resolve(undefined);
    }
}
