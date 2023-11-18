import { MatTabChangeEvent } from "@angular/material/tabs";
import { APIService } from "../api.service";
import { Injectable, OnInit } from "@angular/core";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/models/Category";


@Injectable({
    providedIn: 'root'
})
export class InstancePreviewService implements OnInit {
    title = "instance-preview service";
    // selected category name from where I get the instances using that name
    loadedInstances: any[] = [];

    constructor(public api: APIService, public categoryService : CategoryService) {
        this.categoryService.getCategory().subscribe((category) => this.categoryChanged(category));
    }

    ngOnInit() {

    }

    private async categoryChanged(category: Category | null) {
        if(category == null) {
            return;
        }
         this.loadedInstances =  await this.api.loadInstances(category.name);
    }
}

