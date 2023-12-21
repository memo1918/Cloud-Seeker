import { Component } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import {  valuesIn } from "lodash";
import { CartItem } from "../models/cart-item";
import { PrintService } from "../print.service";
import {MatTooltipModule} from '@angular/material/tooltip';

// this is the comparison component
@Component({
  selector: "app-comparison",
  templateUrl: "./comparison.component.html",
  styleUrls: ["./comparison.component.scss"]
})

export class ComparisonComponent {
  // indicates if the comparison panel is open
  panelOpenState: boolean = false;

  // the constructor of the comparison component
  // @param shoppingCart the shopping cart service that is used to get the items in the shopping cart
  constructor(public shoppingCart: ShoppingCartService, public printService: PrintService) {
    // subscribe to the items in the shopping cart and call the newShoppingCartItems function when the items change
    this.shoppingCart.getItemsObserver().subscribe(items => this.newShoppingCartItems(items));
  }

  // this function is called when the items in the shopping cart change
  // it sets the vendors and the columns to display
  private newShoppingCartItems(items: CartItem[]) {
    if (items.length == 0) {
      return;
    }
    this.vendors = Object.keys(items[0].instance.price);
    this.columnsToDisplay = ["name", ...this.vendors];
  }

  // the vendors that are displayed in the comparison table
  // this is used to display the correct columns
  vendors: string[] = [];
  // the columns that are displayed in the comparison table
  columnsToDisplay: string[] = [];

  // this function returns the total price of the items in the shopping cart not including the units
  // this does not include the units because the units are different for each vendor
  // this is a problem because we can not add the units together and thus should be removed in future releases
  getTotalPrice() {
    // for each item in the shopping cart we add the price of the selected vendor to the total price
    const cartItems = this.shoppingCart.getItems();
    let endPrice = 0;
    for (const cartItem of cartItems) {
      let price = cartItem.pricingInformation[cartItem.selectedProvider];
      endPrice += (price.price * cartItem.numberOfInstances);
    }
    return endPrice;
  }


  // this function returns the unit string for the specified vendor and is displayed on hover next to the vendor price label
  getUnitStringForVendor(providers: any[] | undefined, vendor: string): string {
    // if the providers are not defined we return x
    if (!providers) {
      return 'x';
    }
    // find the index of the vendor in the providers array
    const index = providers.findIndex(providerItem => providerItem?.providerName === vendor);

    // if the vendor is found and the configuration/getUnitString function is defined we return the unit string
    if (index !== -1 && providers[index]?.configuration?.getUnitString) {
      return providers[index].configuration.getUnitString();
    }

    // Handle the case when the vendor is not found or configuration/getUnitString is not defined
    return 'x';
  }

  // functions used in the html
  protected readonly valuesIn = valuesIn;
  protected readonly keys = Object.keys;
}
