import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { CategoryService } from "./category.service";
import { FilterService } from "../filter/filter.service";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material/tabs";

// this is the category component
// it contains the tab group that displays the categories
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements AfterViewInit {
  // the title of the component used for testing
  title = "categoryComponent";

  // the tab group that displays the categories
  // this is used to set the selected index
  @ViewChild("tabGroup") tabGroup!: MatTabGroup;

  // the constructor of the category component
  // @param categoryService the category service that is used to get the categories
  // @param filterService the filter service that is used to set the filter
  constructor(public categoryService: CategoryService, public filterService: FilterService) {
  }

  // this function is called when the tab changes
  // it sets the category to the category that is selected in the category service
  // it sets the filter to an empty array in order to reset the filter
  onTabChange($event: MatTabChangeEvent) {
    this.categoryService.setCategory(this.categoryService.getCategories()[$event.index]);
    this.filterService.setFilter([]);
  }

  // this function is called after the view is initialized
  // it sets the selected index to the index of the category that is selected in the category service
  // it sets the filter to an empty array in order to reset the filter
  // this is done in order to set the selected index after we switch between the home and the shopping cart
  ngAfterViewInit(): void {
    if (this.categoryService.getCategories().length > 0 && this.categoryService.getCategoryValue() != null) {
      this.tabGroup.selectedIndex = this.categoryService.getCategories().indexOf(this.categoryService.getCategoryValue()!);
      this.filterService.setFilter([]);
    }
  }
}
