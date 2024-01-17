import { execQuery } from "../db";
import { _findInstanceComparisons } from "../db/models/instancecomparison";
import { InstanceComparison } from "../interfaces/instancecomparison.interface";

/**
 * wrapper function for _findInstanceComparisons for easy mocking
 *
 * @param categoryname the name of the category to find the instance comparisons for
 * @returns {Promise<InstanceComparison[]>} the instance comparisons for the given category
 */
export async function findInstanceComparisons(categoryname: string): Promise<InstanceComparison[]> {
    return execQuery<InstanceComparison[]>((client) => _findInstanceComparisons(client, categoryname));
}
