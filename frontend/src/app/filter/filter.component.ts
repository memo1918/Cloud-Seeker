import {Component} from '@angular/core';
import {FilterService} from "./filter.service";
import {Field} from "./models/Field";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  title: string = 'Filters';

  numberComponent: string = "number";
  dropdownComponent: string = "dropdown";
  radioComponent: string = "radio"

  testField: Field = {
    "name": "cores",
    "options": [],
    "unit": "Cores",
    "type": "number"
  }

  constructor(public filterService: FilterService) {
  }
}
