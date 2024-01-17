// Purpose: interface for category fields
/**
 * each field has a name, unit, type and options
 */
export interface CategoryField {
    /**
     * the name of the field
     */
    name: string;
    /**
     * the available options for the category -> ui needs to decide on the filter component
     */
    options?: any[];
    /**
     * the unit of this type -> every option should be in that type
     */
    unit: string;
    /**
     * the type of the field to show an according filter in the UI
     */
    type: string;
}
