import {Injectable} from '@angular/core';
import {CategoryService} from "../category/category.service";
import {Field} from "./models/Field";
import {Category} from '../category/models/Category';
import {Chip} from "./models/chip";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public currentCategoryFields: Field[] | undefined;
    private filters$ = new BehaviorSubject<Chip[]>([]);

    constructor(public categoryService: CategoryService) {
        this.categoryService.getCategory().subscribe((category) => this.categoryChanged(category));
    }

    private async categoryChanged(category: Category | null) {
        if (category == null) {
            return;
        }
        this.currentCategoryFields = category.fields;
    }

    getFilter() {
        return this.filters$.asObservable();
    }

    setFilter(filter: Chip[]) {
        this.filters$.next(filter);
    }

    getFilterValue() {
        return this.filters$.getValue();
    }
}
