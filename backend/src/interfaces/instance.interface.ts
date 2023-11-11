import { Document, WithId } from "mongodb";
import { Attributes } from "./attributes.interface";
import { Price } from "./price.interface";

export interface Instance extends WithId<Document> {
    productHash: string;
    sku: string;
    vendorName: string;
    productFamily: string;
    attributes: Attributes;
    prices: Price[];
}
