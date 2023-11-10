import {Injectable} from '@angular/core';
import {APIService} from "../api.service";
import {Category} from "./models/Category";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    selectedIndex: number = 0;
    selectedCategory: Category | undefined;

    constructor(public api: APIService) {
        this.api.loadCategories();
        this.selectedCategory = this.getCategories().at(0);
    }

    setSelectedCategory(value: Category | undefined) {
        this.selectedCategory = value;
    }

    getCategories() {
        return this.api.categories;
    }

    onTabChange(tabChangeEvent: MatTabChangeEvent) {
        this.selectedIndex = tabChangeEvent.index
        this.setSelectedCategory(this.getCategories()[this.selectedIndex])
    }
}
