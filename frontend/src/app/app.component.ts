import {Component} from '@angular/core';
import {APIService} from "./api.service";
import {CategoryService} from "./category/category.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'frontend';

  constructor(public api: APIService, public categoryService: CategoryService) {
    this.api.loadCounter();
  }
}
