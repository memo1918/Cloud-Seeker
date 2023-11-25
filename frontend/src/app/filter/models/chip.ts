import {InstanceComparison} from "src/app/models/instance-comparison";

export interface Chip {
    name: string,
    optionText: string,
    filter: (element: InstanceComparison) => boolean
}
