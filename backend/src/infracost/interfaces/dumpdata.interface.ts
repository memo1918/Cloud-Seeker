import { PriceInformation } from "./priceinformation.interface";

/**
 * this is a common interface for the data that is read from the dump file.
 * it defines the infracost dump structure
 * it represents the data that is read from the dump after attributes and prices are parsed
 */
export interface DumpData {
    /**
     * hash of the product
     */
    productHash: string;
    /**
     * the stock keeping unit of the product (service)
     */
    sku: string;
    /**
     * the vendor name
     */
    vendorName: string;
    /**
     * the region the product is available in
     */
    region: string;
    /**
     * the service name
     */
    service: string;
    /**
     * the product family of the product
     */
    productFamily: string;
    /**
     * the product attributes aws has the most available attributes
     * this is a key value pair of the attribute name and the attribute value
     */
    attributes: { [attributeName: string]: string };
    /**
     * the product pricing
     */
    prices: PriceInformation[];
}
