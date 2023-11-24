import {InstanceComparison} from "src/app/instance-preview/models/instance-comparison"

export interface Chip {
    name: string,
    optionText: string,
    filter: (element: InstanceComparison) => boolean
}
