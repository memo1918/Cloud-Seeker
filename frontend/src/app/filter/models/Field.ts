// Purpose: Model for a field in the filter component.
export interface Field {
  // the name of the field
  name: string;
  // the options of the field
  options: (string | number)[];
  // the unit of the field
  unit: string;
  // the type of the field (dropdown, number)
  type: string;
}


