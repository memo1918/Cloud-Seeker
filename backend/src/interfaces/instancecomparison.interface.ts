// Purpose: Interface for instance comparison data. Used in instance comparison service.
// each instance comparison has a name, a category name, a price and fields
// the fields are the fields defined in the category
/**
 * interface for instance comparison data
 * used in instance comparison service
 * each instance comparison has a name, a category name, a price and fields
 * the fields are the fields defined in the category
 */
export interface InstanceComparison {
    /**
     * the name of the instance comparison
     */
    name: { [vendor: string]: string };
    /**
     * the name of the category this instance comparison is part of
     */
    categoryName: string;
    /**
     * the price of the instance comparison by vendor
     */
    price: {
        // name of the vendor
        /**
         * name of the vendor
         */
        [vendor: string]: {
            /**
             * the price value
             */
            value: number | string;
            /**
             * the price unit
             */
            unit: string;
        };
    };
    /**
     * the fields of the instance comparison defined in the category
     */
    fields: {
        /**
         * name of the field
         */
        [fieldName: string]: {
            /**
             * the value of the field
             */
            value: string | number;
            /**
             * the unit of the field
             */
            unit: string;
        };
    };
    /**
     * the skus of the instance comparison
     * the skus are used to identify the instances in the database
     * they should be unique
     */
    skus: string[];
}
