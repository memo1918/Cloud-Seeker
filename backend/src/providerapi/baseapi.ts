import { IService } from "../db/models/services";
// currently unused
// resulting price information parsed from a api
export interface PriceInformation {
    value: number;
    unit: string;
}

// currently unused
// base api interface
// each api has a name, a display name, a function to get price information and a function to convert price information
export interface BaseApi {
    name: string;
    displayName: string;

    getPriceInformation(instance: IService): PriceInformation;

    convert(instance: IService, category: any, unit: any): PriceInformation;
}
