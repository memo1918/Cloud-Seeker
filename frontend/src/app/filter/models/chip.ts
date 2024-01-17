import { InstanceComparison } from "src/app/models/instance-comparison";

// this is the chip interface
// it is used to display a chip in the filter component
// it contains the name of the chip
// it contains the option text of the chip
// it contains a filter function that is used to filter the instances
export interface Chip {
  // the name of the chip and field
  name: string,
  // the option text of the chip displayed in the tag
  optionText: string,
  // the filter function that is used to filter the instances
  filter: (element: InstanceComparison) => boolean
}
