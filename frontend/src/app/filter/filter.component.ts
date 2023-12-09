import { Component } from "@angular/core";
import { FilterService } from "./filter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  title: string = 'Filters';

  readonly numberComponent: string = "number";
  readonly dropdownComponent: string = "dropdown";

  // readonly radioComponent: string = "radio"


  constructor(public filterService: FilterService) {
  }
}
