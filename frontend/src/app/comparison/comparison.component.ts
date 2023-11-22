import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShoppingCartService } from "../shopping-cart.service";

import {CartItem} from "./cart-item";
@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})

export class ComparisonComponent {
  panelOpenState: boolean =false;
  selectedOption: string[] = []; // Initialize it with the default value
  constructor(public shoppingCart:ShoppingCartService) {
    this.shoppingCart.getItemsObserver().subscribe(items=>this.newShoppingCartItems(items))
  }
  protected readonly keys = Object.keys;
  private newShoppingCartItems(items: CartItem[]){
    if(items.length == 0){
      return;
    }
    this.vendors = Object.keys(items[0].price);
    this.columnsToDisplay = ["name", ...this.vendors];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let lowestPrice: number = Number.POSITIVE_INFINITY;
      let lowestVendor: string = "";
      for (const vendor of this.vendors) {
        if (item.price[vendor].value < lowestPrice){
          lowestVendor = vendor;
          lowestPrice = item.price[vendor].value;
        }
      }
      this.selectedOption[i] = lowestVendor;
    }
  }
  vendors: string[] = []
  columnsToDisplay: string[] = [];

  getTotalPrice(){
    const cartItems = this.shoppingCart.getItems();
    let endPrice = 0;
      for (let i = 0; i < this.selectedOption.length; i++) {
      const selected = this.selectedOption[i];
      const item = cartItems[i];
      endPrice += item.price[selected].value;
    }
      return endPrice;
  }
}
