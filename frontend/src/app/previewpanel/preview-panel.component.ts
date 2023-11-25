import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../header/header.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { CartItem } from "../models/cart-item";
import { CartItemGroup } from "../models/cart-item-group";
import { valuesIn } from "lodash";


@Component({
  selector: "app-previewpanel",
  templateUrl: "./preview-panel.component.html",
  styleUrls: ["./preview-panel.component.scss"]
})
export class PreviewPanelComponent implements OnInit {
  showPanel = false;

  constructor(private headerService: HeaderService, public shoppingCart: ShoppingCartService) {
  }

  ngOnInit() {
    this.headerService.toggle$.subscribe((toggle) => (this.showPanel = toggle));
    // this.shoppingCart.getItemsObserver().subscribe((items) => (this.items$ = items));
  }

  public close() {
    this.showPanel = false; // Always set to false when closing
  }

  sortIntoGroups(list: CartItem[] | null): CartItemGroup[] {
    if (list == null) {
      list = [];
    }
    list = list.sort((a, b) => a.instance.categoryName.localeCompare(b.instance.categoryName));
    let current: CartItemGroup | undefined;
    let result: CartItemGroup[] = [];

    for (let cartItem of list) {
      if (!current) {
        current = {
          category: cartItem.instance.categoryName,
          items: []
        };
        result.push(current)
      }

      if(current.category == cartItem.instance.categoryName){
        current.items.push(cartItem)
      }

      else {
        current = {
          category: cartItem.instance.categoryName,
          items: [cartItem]
        };
        result.push(current)
      }

    }
    return result;

  }

  protected readonly valuesIn = valuesIn;
}
