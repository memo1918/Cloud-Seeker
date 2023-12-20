// we expect the vendor to contain consistent provider specific units or mapping via the cloud provider api based on instance values
// to construct a category we first need to know all instance members
export interface CategoryVendor {
    name: "aws" | "gcp" | "azure"; // name of the vendor -> aws, gcp, azure
    columns: {
        // columns are the fields that are part of this category for this vendor
        // columns contain the mapping of that field to a field in the instancecomparison
        // the mapping is done by defining a json path like "attributes.serviceType"
        // the json path is resolved recursively for each vendor
        // the column name is the name of the field in the instancecomparison
        [columnname: string]: {
            // columnname = CategoryField.name -> when we want to map that service we can get that field and convert it to the target unit and add it to the options
            path: string[]; // maps a json path like {description:"attributes.description"} to resolve property names recursive and dynamic for each vendor
            conversion: any; // additional conversion information for the cloud specific api like math function or smthing else
        };
    };
}
