import {Injectable} from '@angular/core';
import {APIService} from "../api.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(public api: APIService) {
        this.api.loadCategories();
    }

    getCategories() {
        return this.api.categories;
    }

}
