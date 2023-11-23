import {Component, Input} from '@angular/core';
import {FilterService} from "../filter.service";
import {Field} from "../models/Field";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dropdown-regulator',
  templateUrl: './dropdown-regulator.component.html',
  styleUrls: ['./dropdown-regulator.component.scss']
})
export class DropdownRegulatorComponent {
  @Input({required: true}) field!: Field;
  selectedOption = new FormControl(null);

  constructor(public filterService: FilterService) {

  }
}
