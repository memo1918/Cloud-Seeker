import { BaseApi, PriceInformation } from "./baseapi";
import { IService } from "../db/models/services";

export class AwsApi implements BaseApi {
    name: string = "aws";
    displayName = "AmazonWebServices";

    getPriceInformation(instance: IService): PriceInformation {
        return {} as PriceInformation;
    }

    convert(instance: IService, category: any, unit: any): PriceInformation {
        return {} as PriceInformation;
    }
}
