import {APIService} from "../api.service";
import {Injectable} from "@angular/core";
import {CategoryService} from "../category/category.service";
import {Category} from "../category/models/Category";
import {InstanceComparison} from "../models/instance-comparison";



@Injectable({
    providedIn: "root"
})
export class InstancePreviewService {
    title = "instance-preview service";
    loadedInstances: InstanceComparison[] = [];

    constructor(public api: APIService, public categoryService: CategoryService) {
        //@ts-ignore
        window["InstancePreviewService"] = this;
        this.categoryService.getCategory().subscribe((category) => this.categoryChanged(category));
    }

    private async categoryChanged(category: Category | null) {
        if (category == null) {
            return;
        }
        this.loadedInstances = await this.api.loadInstances(category.name);
    }

}

