import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShoppingCartService } from "../shopping-cart.service";
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})

export class ComparisonComponent {
  panelOpenState: boolean =false;
  selectedOption: string[] = []; // Initialize it with the default value
  constructor(public shoppingCart:ShoppingCartService) {

  }
  protected readonly keys = Object.keys;

  columnsToDisplay = [`name`, 'aws', 'azure', 'gcp']
}
