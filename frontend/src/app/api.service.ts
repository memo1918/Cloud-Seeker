import {Injectable} from '@angular/core';
import {Category} from "./category/models/Category";

@Injectable({
    providedIn: 'root'
})
export class APIService {
    private baseLocation: string;

    constructor() {
        this.baseLocation = `${window.location.protocol}//${window.location.host}/api`;
    }

    public counter: number | null = null;
    public counterLoading: boolean = true;

    public categories: Category[] = [];

    // public categoryLoading: boolean = true;

    public async loadCounter() {
        try {
            let response = await fetch(`${this.baseLocation}/`);
            let {data}: { "data": { "visitors": number } } = await response.json();
            this.counter = data.visitors;
            this.counterLoading = false;
        } catch (err) {
            console.error(err);
        }
    }

    public async loadCategories() {
        try {
            let response = await fetch(`${this.baseLocation}/categories`);
            let {data}: { "data": { "categories": Category[] } } = await response.json();
            this.categories = data.categories;
            // this.categoryLoading = false;
        } catch (err) {
            console.error(err);
        }
    }
}
