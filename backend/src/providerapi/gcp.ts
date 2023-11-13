import { BaseApi, PriceInformation } from "./baseapi";
import { IService } from "../db/models/services";

export class GcpApi implements BaseApi {
    name: string = "gcp";
    displayName = "Google Cloud Platform";

    getPriceInformation(instance: IService): PriceInformation {
        return {} as PriceInformation;
    }

    convert(instance: IService, category: any, unit: any): PriceInformation {
        return {} as PriceInformation;
    }
}
