import { Injectable } from "@angular/core";
import { APIService } from "../api.service";
import { Category } from "./models/Category";
import { BehaviorSubject } from "rxjs";

// this is the category service
// it contains the selected category
// it loads the categories from the api service
@Injectable({
  providedIn: "root"
})
export class CategoryService {
  // the selected category
  // this is a behavior subject so other components can subscribe to it and get the selected category
  protected selectedCategory$ = new BehaviorSubject<Category | null>(null);

  // the constructor of the category service
  constructor(public api: APIService) {
    // save the category service in the window object for testing purposes
    //@ts-ignore
    window["CategoryService"] = this;
    // load the categories from the api service
    this.loadCategories();
  }

  // this function loads the categories from the api service
  public loadCategories() {
    this.api.loadCategories().then(i => {
      // set the first category as the selected category after the categories are loaded
      console.log("loading of categories complete");
      this.setCategory(this.getCategories()[0]);
    });
  }

  // this function returns the categories from the api service
  getCategories() {
    return this.api.categories;
  }

  // this function returns the selected category as an observable
  getCategory() {
    return this.selectedCategory$.asObservable();
  }

  // this function returns the selected category
  getCategoryValue() {
    return this.selectedCategory$.getValue();
  }

  // this function sets the selected category
  setCategory(selectedCategory: Category) {
    this.selectedCategory$.next(selectedCategory);
  }

}
