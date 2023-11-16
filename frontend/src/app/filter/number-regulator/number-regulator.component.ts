import {Component} from '@angular/core';
import {FilterService} from "../filter.service";

@Component({
  selector: 'app-number-regulator',
  templateUrl: './number-regulator.component.html',
  styleUrls: ['./number-regulator.component.scss']
})
export class NumberRegulatorComponent {

  public minNumber: number = 0;
  public maxNumber: number = 1;

  numberFields: any = [];
  unitName: string = "test";
  numberValue: number[] = [];

  constructor(public filterService: FilterService) {
    this.numberFields = filterService.numberTypesArray;
  }
}
