import {Component} from '@angular/core';
import {CategoryService} from "../category.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {

    constructor(public categoryService: CategoryService) {
    }
}
