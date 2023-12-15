import { Injectable } from "@angular/core";
import { Category } from "./category/models/Category";
import { InstanceComparisonResponse } from "./models/instance-comparison-response";
import { InstanceComparison } from "./models/instance-comparison";

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
      let response = await fetch(`${this.baseLocation}/`);
      let { data }: { "data": { "visitors": number } } = await response.json();
      this.counter = data.visitors;
      this.counterLoading = false;
    } catch (err) {
      console.error(err);
    }
  }

  public async loadCategories() {
    try {
      let response = await fetch(`${this.baseLocation}/categories`);
      let { data }: { "data": { "categories": Category[] } } = await response.json();
      this.categories = data.categories;
    } catch (err) {
      console.error(err);
    }
  }

  public async loadInstances(categoryName: string) {
    try {
      let response = await fetch(`${this.baseLocation}/categories/instancecomparisons?categoryname=${categoryName}`);
      let { data }: InstanceComparisonResponse = await response.json();
      this.putInstanceIntoCache(...data.InstanceComparisons);
      return data.InstanceComparisons;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  private skuCache: Map<string, InstanceComparison> = new Map<string, InstanceComparison>();

  public async getInstancesBySKU(instances: string[][]) {
    const getKey = (instance: string[]) => instance.map(btoa).join(",");

    let instancesNotInCache = instances.filter(instance => !this.skuCache.has(getKey(instance)));
    let instancesInCache = instances.filter(instance => this.skuCache.has(getKey(instance)));

    let result = [];
    for (const instanceInCache of instancesInCache) {
      result.push(this.skuCache.get(getKey(instanceInCache)));
    }

    if (instancesNotInCache.length == 0) {
      return result;
    }
    // fetch missing instances
    try {
      let response = await fetch(`${this.baseLocation}/categories/instancecomparisons`, {
        method: "POST",
        body: JSON.stringify(instancesNotInCache)
      });
      let { data }: InstanceComparisonResponse = await response.json();
      this.putInstanceIntoCache(...data.InstanceComparisons);
      return [...result, ...data.InstanceComparisons];
    } catch (err) {
      console.error(err);
      return [];
    }

  }

  private putInstanceIntoCache(...sku: InstanceComparison[]) {
    const getKey = (instance: string[]) => instance.map(btoa).join(",");
    for (const instanceComparison of sku) {
      this.skuCache.set(getKey(instanceComparison.skus), instanceComparison);
    }
  }
}
