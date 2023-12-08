import {Component} from '@angular/core';
import {CategoryService} from "./category.service";
import {FilterService} from "../filter/filter.service";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})

export class CategoryComponent {
  title = 'categoryComponent';

  constructor(public categoryService: CategoryService, public filterService: FilterService) {
  }

  onTabChange($event: MatTabChangeEvent) {
    this.categoryService.onTabChange($event);
    this.filterService.setFilter([]);
  }
}
