import { CategoryVendor } from "./categoryvendor.interface";
import { CategoryField } from "./categoryfield.interface";

export interface Category {
    name: string; // productFamily
    icon: string; // some mechanism to define icons
    description: string; //
    vendors: CategoryVendor[];
    fields: CategoryField[];
    discovery: {
        // defines the mapping of the instance to a category like: does instance x meet vendor specific requirements to be part of this category?
        [vendor: string]: {
            key: string[]; // maps a json path like "attributes.serviceType",
            value: string[]; // possible options for this field like ["Storage","Database","storage"...]
        };
    };
}
