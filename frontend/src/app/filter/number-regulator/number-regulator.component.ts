import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FilterService} from "../filter.service";
import {Field} from "../models/Field";

@Component({
  selector: 'app-number-regulator',
  templateUrl: './number-regulator.component.html',
  styleUrls: ['./number-regulator.component.scss']
})
export class NumberRegulatorComponent {
  @Input({required: true}) field!: Field;
  public minNumber: number | undefined;
  public maxNumber: number | undefined;

  constructor(public filterService: FilterService) {
    let numbers = ["1", "3", "4", "2"]
    //numbers = numbers
      .filter(option => /^\d+$/.test(option as string))
      .map(option => parseInt(option as string, 10)) as number[];
    this.minNumber = Math.min(...numbers);
    this.maxNumber = Math.max(...numbers);
  }

  private setMinAndMaxNumber() {
    //let numbers = this.field.options.filter(option => typeof option === 'number') as number[];
    const numbers = ["1", "3", "4", "2"]
    //this.minNumber = Math.min(...numbers);
    //this.maxNumber = Math.max(...numbers);
  }

}
