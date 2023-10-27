import {Injectable} from '@angular/core';
import {APIService} from "../api.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(public api: APIService) {
        this.api.loadCategories();
    }

    // public extractFieldName(fields: []) {
    //     let name: any[] = Object.keys(fields).map(key => name[key]);
    //     return name;
    // }

}
