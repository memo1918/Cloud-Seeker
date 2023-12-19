// Purpose: CSV data interface.
// this is a common interface for the data that is read from the CSV file.
// it defines the infracost dump csv structure
export interface CsvData {
    // hash of the product
    productHash: string;
    // the stock keeping unit of the product (service)
    sku: string;
    // the vendor name
    vendorName: string;
    // the region the product is available in
    region: string;
    // the service name
    service: string;
    // the product family of the product
    productFamily: string;
    // the product attributes aws has the most available attributes
    attributes: string;
    // the product pricing it is a json string
    prices: string;
}
