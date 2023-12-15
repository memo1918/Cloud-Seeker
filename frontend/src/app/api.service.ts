import { Injectable } from "@angular/core";
import { Category } from "./category/models/Category";
import {
  InstanceComparisonErrorResponse,
  InstanceComparisonSuccessResponse
} from "./models/instance-comparison-response";
import { InstanceComparison } from "./models/instance-comparison";
import { ApiResult } from "./api-result";

@Injectable({
  providedIn: "root"
})
export class APIService {
  private baseLocation: string;

  constructor() {
    this.baseLocation = `${window.location.protocol}//${window.location.host}/api`;
  }

  public counter: number | null = null;
  public counterLoading: boolean = true;

  public categories: Category[] = [];

  public async loadCounter() {
    try {
      let response = await window.fetch(`${this.baseLocation}/`);
      let { data }: { "data": { "visitors": number } } = await response.json();
      this.counter = data.visitors;
      this.counterLoading = false;
    } catch (err) {
      console.error(err);
    }
  }

  public async loadCategories() {
    try {
      let response = await window.fetch(`${this.baseLocation}/categories`);
      let { data }: { "data": { "categories": Category[] } } = await response.json();
      this.categories = data.categories;
    } catch (err) {
      console.error(err);
    }
  }

  public async loadInstances(categoryName: string) {
    try {
      let response = await window.fetch(`${this.baseLocation}/categories/instancecomparisons?categoryname=${categoryName}`);
      // debugger;
      let { data }: InstanceComparisonSuccessResponse = await response.json();
      this.putInstanceIntoCache(...data.InstanceComparisons);
      return data.InstanceComparisons;
    } catch (err) {
      console.error(err);
      debugger;
      return [];
    }
  }

  private skuCache: Map<string, InstanceComparison> = new Map<string, InstanceComparison>();

  public async getInstancesBySKU(instances: string[][]): ApiResult<InstanceComparison[]> {
    const getKey = (instance: string[]) => instance.map(btoa).join(",");

    let instancesNotInCache = instances.filter(instance => !this.skuCache.has(getKey(instance)));

    if (instancesNotInCache.length != 0) {
      // window.fetch missing instances
      try {
        let body = JSON.stringify(instancesNotInCache);
        let response = await window.fetch(`${this.baseLocation}/categories/instancecomparisons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: body
        });

        let {
          data,
          error
        }: InstanceComparisonSuccessResponse & InstanceComparisonErrorResponse = await response.json();

        if (!data) {
          return [null, error];
        }
        this.putInstanceIntoCache(...data.InstanceComparisons);

      } catch (err) {
        console.error(err);
        return [null, { message: "could not window.fetch a response" }];
      }
    }

    let result: InstanceComparison[] = [];
    for (const instanceInCache of instances) {
      result.push(this.skuCache.get(getKey(instanceInCache))!);
    }
    return [result, null];
  }

  private putInstanceIntoCache(...sku: InstanceComparison[]) {
    const getKey = (instance: string[]) => instance.map(btoa).join(",");
    for (const instanceComparison of sku) {
      this.skuCache.set(getKey(instanceComparison.skus), instanceComparison);
    }
  }
}
