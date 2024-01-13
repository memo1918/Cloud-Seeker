import { CategoryVendor } from "./categoryvendor.interface";
import { CategoryField } from "./categoryfield.interface";

/**
 * interface for a category
 */
export interface Category {
    /**
     * productFamily of the category
     */
    name: string;
    /**
     * some mechanism to define icons
     */
    icon: string;
    /**
     * predefined description of the category
     */
    description: string;
    /**
     * stores the vendors that are part of this category
     * each vendor has a name and a list of fields
     * the name is the name of the vendor
     * the columns are the fields that are part of this category for this vendor
     * columns contain the mapping of that field to a field in the instancecomparison
     * the mapping is done by defining a json path like "attributes.serviceType"
     */
    vendors: CategoryVendor[];
    /**
     * stores the fields that are part of this category
     * each field has a name, unit, type and options
     *  the name is the name of the field
     *  the unit is the unit of this type -> every option should be in that type
     *  the type is the type of the field to show an according filter in the UI currently implemented "dropdown", "number"
     */
    fields: CategoryField[];
    /**
     * enables the user to define a mapping of the instance to a category like:
     * does instance x meet vendor specific requirements to be part of this category?
     * for each vendor a list of key value pairs is defined
     * the key is a json path like "attributes.serviceType"
     * the value is a list of possible options for this field like ["Storage","Database","storage"...]
     * if the instance has a value for the key that is in the list of possible options it is part of the category
     */
    discovery: {
        /**
         * defines the mapping of the instance to a category like: does instance x meet vendor specific requirements to be part of this category?
         */
        [vendor: string]: {
            /**
             * maps a json path like "attributes.serviceType"
             */
            key: string[];
            /**
             * maps a list of possible options for this field like ["Storage","Database","storage"...]
             */
            value: string[];
        };
    };
}
