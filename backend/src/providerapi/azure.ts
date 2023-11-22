import { BaseApi, PriceInformation } from "./baseapi";
import { IService } from "../db/models/services";

export class AzureApi implements BaseApi {
    name: string = "azure";
    displayName = "Azure";

    getPriceInformation(instance: IService): PriceInformation {
        return {} as PriceInformation;
    }

    convert(instance: IService, category: any, unit: any): PriceInformation {
        return {} as PriceInformation;
    }
}
