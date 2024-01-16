import { APIService } from "../api.service";
import { Injectable } from "@angular/core";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/models/Category";
import { InstanceComparison } from "../models/instance-comparison";

/**
 *  This service is responsible for loading and storing the instances that are displayed in the instance preview.
 *  It is also responsible for loading the instances from the backend and detecting changes in the category.
 */
@Injectable({
  providedIn: "root"
})

export class InstancePreviewService {
  title = "instance-preview service";
  loadedInstances: InstanceComparison[] = [];

  /**
   *  This method loads the instances from the backend and stores them in the loadedInstances array.
   */

  constructor(public api: APIService, public categoryService: CategoryService) {
    //@ts-ignore
    window["InstancePreviewService"] = this;
    this.categoryService.getCategory().subscribe((category) => this.categoryChanged(category));
  }

  /**
   *  This method returns the loaded instances if the category is changed.
   */

  private async categoryChanged(category: Category | null) {
    if (category == null) {
      return;
    }
    this.loadedInstances = await this.api.loadInstances(category.name);
  }

}

