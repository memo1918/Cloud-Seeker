import { IService } from "../db/models/services";

export interface PriceInformation {
    value: number,
    unit: string
}

export interface BaseApi {
    name: string;
    displayName: string;

    getPriceInformation(instance: IService): PriceInformation;

    convert(instance: IService, category: any, unit: any): PriceInformation;
}