import {Component} from '@angular/core';
import {APIService} from "./api.service";
import {CategoryService} from "./category/category.service";
import {FilterService} from "./filter/filter.service";
import { RoutingService } from "./routing.service";
import { PrintService } from "./print.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'frontend';
  constructor(public api: APIService, public categoryService: CategoryService, public filterService: FilterService,public routingService: RoutingService, public printService : PrintService) {
    this.api.loadCounter();
  }

  printDocument() {
    this.printService.print();
  }
}
