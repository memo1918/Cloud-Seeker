import {Injectable} from '@angular/core';
import {CategoryService} from "../category/category.service";
import {Field} from "./models/Field";
import {Category} from '../category/models/Category';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public currentCategoryFields: Field[] | undefined;

  constructor(public categoryService: CategoryService) {
    //this.currentCategoryFields = categoryService.selectedCategory?.fields;
    this.categoryService.getCategory().subscribe((category) => this.categoryChanged(category));
  }

  private async categoryChanged(category: Category | null) {
    if (category == null) {
      return;
    }
    this.currentCategoryFields = category.fields;
  }

  getTypeOfFieldAtIndex(index: number): any {
    if (this.currentCategoryFields) {
      if (index >= 0 && index < this.currentCategoryFields.length) {
        return this.currentCategoryFields[index].type;
      }
    }
  }
}
