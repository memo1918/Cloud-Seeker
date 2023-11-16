import {Injectable} from '@angular/core';
import {CategoryService} from "../category/category.service";
import {Field} from "./models/Field";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public currentFilters: { name: string; options: (string | number)[]; unit: string; type: string }[] | undefined;

  public numberTypesArray: Field[];
  public dropdownTypesArray: Field[];
  public radiobuttonTypesArray: Field[];

  constructor(public categoryService: CategoryService) {
    this.currentFilters = categoryService.selectedCategory?.fields;

    this.numberTypesArray = this.mapCurrentFiltersToField("number");
    this.dropdownTypesArray = this.mapCurrentFiltersToField("dropdown");
    this.radiobuttonTypesArray = this.mapCurrentFiltersToField("radiobutton");
  }

  mapCurrentFiltersToField(targetType: string): Field[] {
    return (this.currentFilters || [])
      .filter(field => field.type === targetType) // Adjust the type as needed
      .map(filteredField => ({
        name: filteredField.name,
        options: filteredField.options,
        unit: filteredField.unit,
        type: filteredField.type,
      }));
  }

}
