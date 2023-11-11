import { PriceInformation } from "./priceinformation.interface";

export interface DumpData {
    productHash: string;
    sku: string;
    vendorName: string;
    region: string;
    service: string;
    productFamily: string;
    attributes: { [attributeName: string]: string };
    prices: PriceInformation[];
}
