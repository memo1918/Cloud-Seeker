import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShoppingCartService } from "../../shopping-cart.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  panelOpenState: boolean =false;
  constructor(public shoppingCart:ShoppingCartService) {
  }
}
