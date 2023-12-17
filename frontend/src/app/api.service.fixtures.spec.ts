import {Category} from "./category/models/Category";
import {InstanceComparison} from "./models/instance-comparison";
import {ApiResult} from "./api-result";
import {StorageInstanceComparisons} from "./mocks/apiservice/storage-instance-comparison.spec";
import {ComputeInstanceComparisons} from "./mocks/apiservice/compute-instance-comparisons.spec";
import {RelationalStorageInstanceComparisons} from "./mocks/apiservice/relationaldb-instance-comparisons.spec";
import {SAMPLE_CATEGORIES} from "./mocks/apiservice/categories.spec";


export class MockApiService {
  private baseLocation: string = "";
  categories: Category[] = [];
  counter: number | null = null;
  counterLoading: boolean = true;
  private skuCache: Map<string, InstanceComparison> = new Map<string, InstanceComparison>();
  private getKey = (instance: string[] = []) => instance.map(btoa).join(",");

  constructor() {
    this.putInstanceIntoCache(...StorageInstanceComparisons);
    this.putInstanceIntoCache(...ComputeInstanceComparisons);
    this.putInstanceIntoCache(...RelationalStorageInstanceComparisons);
  }

  async getInstancesBySKU(instances: string[][]): ApiResult<InstanceComparison[]> {
    let result: InstanceComparison[] = [];
    // this.skuCache.forEach((value, key) => console.log(key, value))
    // debugger;
    for (const instanceInCache of instances) {
      result.push(this.skuCache.get(this.getKey(instanceInCache))!);
    }
    return Promise.resolve([result, null]);
  }

  async loadCategories(): Promise<void> {

    // remove all elements from categories
    this.categories.splice(0, this.categories.length)

    // add all elements from SAMPLE_CATEGORIES
    this.categories.push(...SAMPLE_CATEGORIES)
    return Promise.resolve();
  }

  async loadCounter(): Promise<void> {
    this.counter = 1;
    this.counterLoading = false;
    return Promise.resolve(undefined);
  }

  async loadInstances(categoryName: string): Promise<InstanceComparison[] | any[]> {
    let returndata: InstanceComparison[] = [];

    switch (categoryName) {
      case "Compute":
        returndata = ComputeInstanceComparisons;
        break;
      case "Storage":
        returndata = StorageInstanceComparisons;
        break;
      case "Relational Database":
        returndata = RelationalStorageInstanceComparisons;
        break;
    }

    return Promise.resolve(returndata);
  }

  private putInstanceIntoCache(...sku: InstanceComparison[]): void {
    for (const instance of sku) {
      this.skuCache.set(this.getKey(instance.skus), instance);
    }
  }

}
