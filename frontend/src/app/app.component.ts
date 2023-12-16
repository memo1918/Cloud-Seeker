import {Component} from '@angular/core';
import {APIService} from "./api.service";
import {CategoryService} from "./category/category.service";
import {FilterService} from "./filter/filter.service";
import { RoutingService } from "./routing.service";
import { ComparisonComponent } from "./comparison/comparison.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'frontend';
  constructor(public api: APIService, public categoryService: CategoryService, public filterService: FilterService,public routingService: RoutingService) {
    this.api.loadCounter();
  }

  printDocument() {

    console.log("print it");
    window.print();
  }
}
