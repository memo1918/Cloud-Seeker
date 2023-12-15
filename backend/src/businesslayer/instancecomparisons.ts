import { execQuery } from "../db";
import { _findInstanceComparisons, _findInstanceCompareSkus } from "../db/models/instancecomparison";
import { InstanceComparison } from "../interfaces/instancecomparison.interface";

export async function findInstanceComparisons(categoryname: string) {
    return execQuery<InstanceComparison[]>((client) => _findInstanceComparisons(client, categoryname));
}
export async function findInstanceComparisonSkus(skuArray: string[][]) {
    return execQuery<InstanceComparison[]>((client) => _findInstanceCompareSkus(client, skuArray));
}
