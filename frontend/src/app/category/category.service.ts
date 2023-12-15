import { Injectable } from "@angular/core";
import { APIService } from "../api.service";
import { Category } from "./models/Category";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  protected selectedCategory$ = new BehaviorSubject<Category | null>(null);

  constructor(public api: APIService) {
    //@ts-ignore
    window["CategoryService"] = this;
    this.loadCategories();
  }

  public loadCategories() {
    this.api.loadCategories().then(i => {
      console.log("laoding of categories complete");
      this.setCategory(this.getCategories()[0]);
    });
  }

  getCategories() {
    return this.api.categories;
  }

  //
  // onTabChange(tabChangeEvent: MatTabChangeEvent) {
  //   this.setCategory(this.getCategories()[tabChangeEvent.index]);
  // }

  getCategory() {
    return this.selectedCategory$.asObservable();
  }

  getCategoryValue() {
    return this.selectedCategory$.getValue();
  }

  setCategory(selectedCategory: Category) {
    this.selectedCategory$.next(selectedCategory);
  }

}
