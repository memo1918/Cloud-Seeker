import { Document, WithId } from "mongodb";
import { Attributes } from "./attributes.interface";
import { Price } from "./price.interface";

// Purpose: Interface for instances.
export interface Instance extends WithId<Document> {
    productHash: string;
    sku: string;
    service: string;
    vendorName: string;
    productFamily: string;
    attributes: Attributes;
    prices: Price[];
}
