import {Injectable} from '@angular/core';
import {CategoryService} from "../category/category.service";
import {Field} from "./models/Field";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public currentCategoryFields: Field[] | undefined;

  constructor(public categoryService: CategoryService) {
    this.currentCategoryFields = categoryService.selectedCategory?.fields;
  }

  getTypeOfFieldAtIndex(index: number): any {
    if (this.currentCategoryFields) {
      if (index >= 0 && index < this.currentCategoryFields.length) {
        return this.currentCategoryFields[index].type;
      }
    }
  }
}
