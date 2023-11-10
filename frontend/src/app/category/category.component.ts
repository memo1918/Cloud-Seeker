import {Component} from '@angular/core';
import {CategoryService} from "./category.service";

@Component({
    selector: 'app-main',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})

export class CategoryComponent {
    title = 'categoryComponent';

    constructor(public categoryService: CategoryService) {
    }
}
