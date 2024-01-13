import { Document, WithId } from "mongodb";
import { Attributes } from "./attributes.interface";
import { Price } from "./price.interface";

// Purpose: Interface for instances.
/**
 * Interface for instances.
 */
export interface Instance extends WithId<Document> {
    /**
     * the hash of the product
     */
    productHash: string;
    /**
     * the sku of the product
     */
    sku: string;
    /**
     * the name of the product
     */
    service: string;
    /**
     * the name of the vendor
     */
    vendorName: string;
    /**
     * the family of the product
     */
    productFamily: string;
    /**
     * the attributes of the product
     */
    attributes: Attributes;
    /**
     * the prices of the product
     */
    prices: Price[];
}
