import {Injectable} from '@angular/core';
import {APIService} from "../api.service";
import {Category} from "./models/Category";
import {MatTabChangeEvent} from "@angular/material/tabs";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    selectedIndex: number = 0;
    // selectedCategory: Category | undefined;
    private selectedCategory$ = new BehaviorSubject<Category|null>(null)

    constructor(public api: APIService) {
        this.api.loadCategories();
        this.setCategory(this.getCategories()[0]);
    }

    // setSelectedCategory(value: Category | undefined) {
    //     this.selectedCategory = value;
    // }

    getCategories() {
        return this.api.categories;
    }

    onTabChange(tabChangeEvent: MatTabChangeEvent) {
        this.selectedIndex = tabChangeEvent.index;
        this.setCategory(this.getCategories()[this.selectedIndex])
    }
    getCategory() {
        return this.selectedCategory$.asObservable();
    }
    setCategory(selectedCategory : Category) {
        this.selectedCategory$.next(selectedCategory);
    }
}
