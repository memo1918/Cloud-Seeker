import {Component} from '@angular/core';
import {FilterService} from "./filter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  title: string = 'Filter';

  constructor(public filterService: FilterService) {
  }
}
