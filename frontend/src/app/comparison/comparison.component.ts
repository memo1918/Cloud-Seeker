import { Component, Input } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { valuesIn } from "lodash";
import { CartItem } from "../models/cart-item";
import { PrintService } from "../print.service";
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: "app-comparison",
  templateUrl: "./comparison.component.html",
  styleUrls: ["./comparison.component.scss"]
})

export class ComparisonComponent {
  panelOpenState: boolean = false;

  // selectedOption: string[] = []; // Initialize it with the default value
  constructor(public shoppingCart: ShoppingCartService, public printService: PrintService) {
    this.shoppingCart.getItemsObserver().subscribe(items => this.newShoppingCartItems(items));
  }

  protected readonly keys = Object.keys;

  private newShoppingCartItems(items: CartItem[]) {
    if (items.length == 0) {
      return;
    }
    this.vendors = Object.keys(items[0].instance.price);
    this.columnsToDisplay = ["name", ...this.vendors];

  }

  vendors: string[] = [];
  columnsToDisplay: string[] = [];

  getTotalPrice() {
    const cartItems = this.shoppingCart.getItems();
    let endPrice = 0;
    for (const cartItem of cartItems) {

      let price = cartItem.pricingInformation[cartItem.selectedProvider];

      endPrice += (price.price * cartItem.numberOfInstances);
    }
    return endPrice;
  }

  protected readonly valuesIn = valuesIn;


  getUnitStringForVendor(providers: any[] | undefined, vendor: string): string {
    if (!providers) {
      return 'x';
    }

    const index = providers.findIndex(providerItem => providerItem?.providerName === vendor);

    if (index !== -1 && providers[index]?.configuration?.getUnitString) {
      return providers[index].configuration.getUnitString();
    }

    // Handle the case when the vendor is not found or configuration/getUnitString is not defined
    return 'x';
  }


}
