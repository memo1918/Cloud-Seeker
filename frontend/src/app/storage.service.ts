import { Injectable } from "@angular/core";
import { CartItem, cartItemToStorageCartItem, StorageCartItem } from "./models/cart-item";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private shoppingCartKey = "SHOPPING_CART_CONFIGURATION";
  public readonly shoppingCart: BehaviorSubject<StorageCartItem[]> = new BehaviorSubject<StorageCartItem[]>([]);

  constructor() {
    window.addEventListener("storage", (event) => {
      this.updateStorage();
    });
  }

  public setCartItems(shoppingCart: CartItem[]) {
    localStorage[this.shoppingCartKey] = JSON.stringify(shoppingCart.map(cartItemToStorageCartItem));
  }

  private getCartItems(): StorageCartItem[] {
    if (!localStorage[this.shoppingCartKey]) {
      return [];
    }

    return JSON.parse(localStorage[this.shoppingCartKey]);
  }

  private updateStorage() {
    this.shoppingCart.next(this.getCartItems());
  }
}
