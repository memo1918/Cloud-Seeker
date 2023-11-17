import {Component, Input} from '@angular/core';
import {FilterService} from "../filter.service";
import {Field} from "../models/Field";

@Component({
  selector: 'app-number-regulator',
  templateUrl: './number-regulator.component.html',
  styleUrls: ['./number-regulator.component.scss']
})
export class NumberRegulatorComponent {
  @Input({required: true}) field!: Field;
  public minNumber: number = 0;
  public maxNumber: number = 1;

  constructor(public filterService: FilterService) {
    this.setMinAndMaxNumber;
  }

  setMinAndMaxNumber() {
    const numbers = this.field.options.filter(option => typeof option === 'number') as number[];
    if (numbers.length >= 1) {
      this.minNumber = Math.min(...numbers);
      this.maxNumber = Math.max(...numbers);
    }
  }
}
