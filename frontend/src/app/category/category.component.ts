import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { CategoryService } from "./category.service";
import { FilterService } from "../filter/filter.service";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})

export class CategoryComponent implements AfterViewInit {
  title = "categoryComponent";
  @ViewChild("tabGroup") tabGroup!: MatTabGroup;

  constructor(public categoryService: CategoryService, public filterService: FilterService) {
  }

  onTabChange($event: MatTabChangeEvent) {
    this.categoryService.setCategory(this.categoryService.getCategories()[$event.index]);
    this.filterService.setFilter([]);
  }

  ngAfterViewInit(): void {
    if (this.categoryService.getCategories().length > 0 && this.categoryService.getCategoryValue() != null) {
      this.tabGroup.selectedIndex = this.categoryService.getCategories().indexOf(this.categoryService.getCategoryValue()!);
      this.filterService.setFilter([]);
    }
  }
}
