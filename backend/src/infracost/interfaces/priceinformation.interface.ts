/**
 * this is a common interface for the price information of a product
 * it defines the infracost price information structure
 */
export interface PriceInformation {
    /**
     * the price per unit
     */
    USD: string;
    // the unit of the price (e.g. GB-Mo)
    // different services have different units
    // the unit is not always the same for the same service (e.g. AWS EC2)
    // the unit is not always the same for different providers (e.g. AWS vs Azure)
    /**
     * the unit of the price (e.g. GB-Mo)
     * different services have different units
     * the unit is not always the same for the same service (e.g. AWS EC2)
     * the unit is not always the same for different providers (e.g. AWS vs Azure)
     */
    unit: string;
    /**
     * the price hash it is a unique identifier for the price used by infracost
     */
    priceHash: string;
    /**
     * the purchase option (e.g. on demand)
     */
    purchaseOption: string;
    /**
     * the term type (e.g. on demand)
     */
    startUsageAmount: string;
    /**
     * the effective date start
     */
    effectiveDateStart: string;
}
