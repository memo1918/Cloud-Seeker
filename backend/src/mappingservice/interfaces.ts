// categories ned to be defined externally
import { Document, WithId } from "mongodb";

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

// we expect the vendor to contain consistent provider specific units or mapping via the cloud provider api based on instance values
// to construct a category we first need to know all instance members
export interface CategoryVendor {
    name: "aws" | "gcp" | "azure"; // name of the vendor
    columns: {
        [columnname: string]: {
            // columnname = CategoryField.name -> when we want to map that service we can get that field and convert it to the target unit and add it to the options
            path: string[]; // maps a json path like {description:"attributes.description"} to resolve property names recursive and dynamic for each vendor
            conversion: any; // additional conversion information for the cloud specific api like math function or smthing else
        };
    };
    // we need discovery to check to which category a instance belongs to
}

export interface CategoryField {
    name: string; // the name of the category
    options?: any[]; // the available options for the category -> ui needs to decide on the filter component
    unit: string; // ut unit of this type -> every option should be in that type
}

// process of constructing the category
// read in predefined information like name, icon, description, vendors, fields and discovery these must be statically defined in a json config file
// read in all instances and get the category of that instance
// then convert fields of that instance via the provider api into the unit of the field
// the fill out the options in the category field
// in the frontend we only need: name, icon, description, fields
// after this is done continue with te instance mapping part

export interface InstanceComparison {
    name: string;
    price: {
        [vendor: string]: { value: number | string; unit: string };
    };
    fields: {
        [fieldName: string]: {
            value: string | number;
            unit: string;
        };
    };
    skus: string[];
}

export interface Instance extends WithId<Document> {
    productHash: string;
    sku: string;
    vendorName: string;
    productFamily: string;
    attributes: Attributes;
    prices: Prices;
}

export interface Attributes {
    [attributeName: string]: string;
}

export interface Prices {
    [priceId: string]: [Price];
}

export interface Price {
    USD: string;
    unit: string;
    priceHash: string;
    description: string;
    endUsageAmount: string;
    purchaseOption: string;
    startUsageAmount: string;
    effectiveDateStart: Date;
}
