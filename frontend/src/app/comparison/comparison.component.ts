import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShoppingCartService } from "../shopping-cart.service";
import {InstanceComparison} from "../models/instance-comparison";
import {valuesIn} from "lodash";
import {CartItem} from "../models/cart-item";

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})

export class ComparisonComponent {
  panelOpenState: boolean =false;
  // selectedOption: string[] = []; // Initialize it with the default value
  constructor(public shoppingCart:ShoppingCartService) {
    this.shoppingCart.getItemsObserver().subscribe(items=>this.newShoppingCartItems(items))
  }
  protected readonly keys = Object.keys;
  private newShoppingCartItems(items: CartItem[]){
    if(items.length == 0){
      return;
    }
    this.vendors = Object.keys(items[0].instance.price);
    this.columnsToDisplay = ["name", ...this.vendors];
    // for (let i = 0; i < items.length; i++) {
    //   const item = items[i];
    //   let lowestPrice: number = Number.POSITIVE_INFINITY;
    //   let lowestVendor: string = "";
      // for (const vendor of this.vendors) {
      //   let value = item.instance.price[vendor].value;
      //   if (typeof value == "string") {
      //     value = value.replace(/\D/g,'')
      //   }
      //   let valueN: number = value as number;
      //   // if (valueN < lowestPrice){
      //   //   lowestVendor = vendor;
      //   //   lowestPrice = +item.price[vendor].value;
      //   // }
      // }
      // this.selectedOption[i] = lowestVendor;
    // }
  }
  vendors: string[] = []
  columnsToDisplay: string[] = [];

  getTotalPrice(){
    const cartItems = this.shoppingCart.getItems();
    let endPrice = 0;
    for (const cartItem of cartItems) {

      let price = cartItem.pricingInformation[cartItem.selectedProvider];

      endPrice += price.price;
    }
    //   for (let i = 0; i < this.selectedOption.length; i++) {
    //   const selected = this.selectedOption[i];
    //   const item = cartItems[i];
    // }
      return endPrice;
  }

  protected readonly valuesIn = valuesIn;
}
