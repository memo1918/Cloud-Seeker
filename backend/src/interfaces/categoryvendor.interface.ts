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
