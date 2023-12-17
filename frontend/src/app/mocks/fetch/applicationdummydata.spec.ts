import { ResponseMappings } from "../../fetch.mock.spec";
import {ComputeInstanceComparisons} from "../apiservice/compute-instance-comparisons.spec";
import {SAMPLE_CATEGORIES} from "../apiservice/categories.spec";
import {StorageInstanceComparisons} from "../apiservice/storage-instance-comparison.spec";
import {RelationalStorageInstanceComparisons} from "../apiservice/relationaldb-instance-comparisons.spec";

export const dummyApplicationData: ResponseMappings = {
  "/api/categories": [JSON.stringify({
    "data": {
      "categories":
        SAMPLE_CATEGORIES
    }
  }), { status: 200, statusText: "OK" }],
  "/api/": [JSON.stringify({ "data": { "visitors": 138 } }), { status: 200, statusText: "OK" }],
  "/api/categories/instancecomparisons?categoryname=Compute": [JSON.stringify({
    "data": {
      "InstanceComparisons": ComputeInstanceComparisons
    }
  }), { status: 200, statusText: "OK" }],
  "/api/categories/instancecomparisons?categoryname=Storage": [JSON.stringify({
    "data": {
      "InstanceComparisons": StorageInstanceComparisons
    }
  }), { status: 200, statusText: "OK" }],
  "/api/categories/instancecomparisons?categoryname=Relational Database": [JSON.stringify({
    "data": {
      "InstanceComparisons": RelationalStorageInstanceComparisons
    }
  }), { status: 200, statusText: "OK" }],
  "/categories/instancecomparisons": [JSON.stringify({
    "data": {
      "InstanceComparisons": [...ComputeInstanceComparisons, ...StorageInstanceComparisons, ...RelationalStorageInstanceComparisons]
    }
  }), { status: 200, statusText: "OK" }]
};
