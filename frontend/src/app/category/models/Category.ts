// Purpose: Model for category object.
// It contains the name of the category, the icon to display, a description of the category, and the fields that are in the category.
// The fields contain the name of the field, the options that are available, the unit of the field, and the type of the field.
// The type of the field can be either "number" or "dropdown".
// The fields are in the order that they should be displayed.
export interface Category {
  // Name of the category.
    name: string;
  // Icon to display.
    icon: string;
  // Description of the category.
    description: string;
  // Fields in the category.
    fields: {
      // Name of the field
        name: string;
      // All available options for the field
        options: (string | number)[];
      // the unit of the filed
        unit: string;
      // the type of the field either "number" or "dropdown"
        type: string;
    }[];
}
