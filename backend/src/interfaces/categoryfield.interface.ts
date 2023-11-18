export interface CategoryField {
    name: string; // the name of the category
    options?: any[]; // the available options for the category -> ui needs to decide on the filter component
    unit: string; // ut unit of this type -> every option should be in that type
    type: string; // the type of the field to show an according filter in the UI
}
