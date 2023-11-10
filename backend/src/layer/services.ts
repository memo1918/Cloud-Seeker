import { _getDistinctUnitsGroupedByServiceFamily } from "../db/models/services";
import { execQuery } from "../db";

export function getDistinctUnitsGroupedByServiceFamily() {
    return execQuery<{
        "_id": string,
        "units": string[]
    }[]>(_getDistinctUnitsGroupedByServiceFamily);
}