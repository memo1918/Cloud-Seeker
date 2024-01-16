import { Component } from "@angular/core";
import { InstancePreviewService } from "./instance-preview.service";
import { toPairs, valuesIn } from "lodash";
import { CategoryService } from "../category/category.service";
import { FilterService } from "../filter/filter.service";

// This component is responsible for displaying the instances in the instance preview.
// It also contains the logic for displaying the instances.
@Component({
  selector: "app-instance-preview",
  templateUrl: "./instance-preview.component.html",
  styleUrls: ["./instance-preview.component.scss"]
})
export class InstancePreviewComponent {
  title = "instance-preview";
  constructor(public instanceService: InstancePreviewService, public categoryService: CategoryService, public filterService: FilterService) {
  }
  protected readonly toPairs = toPairs;
  protected readonly valuesIn = valuesIn;

  // This method returns the instances that are displayed in the instance preview.
  getItems() {
    return this.instanceService.loadedInstances.filter(i => this.filterService.shouldDisplay(i));
  }

  // This method returns the length of the category.
  getCategoryLength() {
    let categoryValue = this.categoryService.getCategoryValue();
    if (!categoryValue) return 0;
    return categoryValue.fields.length;
  }
}

