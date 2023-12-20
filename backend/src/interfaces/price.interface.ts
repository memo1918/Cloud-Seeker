// Purpose: Interface for price object
// each price has a value, a unit, a price hash, a description, an end usage amount, a purchase option, a start usage amount and an effective date start
export interface Price {
    // the value of the service in USD
    USD: string;
    // the unit of the price of the service
    unit: string;
    // the hash of the price
    priceHash: string;
    // the description of the price
    description: string;
    // the end usage amount of the price
    endUsageAmount: string;
    // the purchase option of the price
    purchaseOption: string;
    // the start usage amount of the price
    startUsageAmount: string;
    // the effective date start of the price
    effectiveDateStart: string;
}
