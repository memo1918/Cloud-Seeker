import { Injectable } from "@angular/core";
import { CartItem, cartItemToStorageCartItem, StorageCartItem } from "./models/cart-item";
import { BehaviorSubject } from "rxjs";
import { isEqual } from "lodash";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private shoppingCartKey = "SHOPPING_CART_CONFIGURATION";
  public readonly shoppingCart: BehaviorSubject<StorageCartItem[]> = new BehaviorSubject<StorageCartItem[]>([]);
  private disablePropagation = false;

  constructor() {
    window.addEventListener("storage", (event) => {
      this.updateStorage();
    });
    this.updateStorage();
  }

  public setCartItems(shoppingCart: CartItem[]) {
    let value = shoppingCart.map(cartItemToStorageCartItem);
    if (!isEqual(this.getCartItems(), value)) localStorage.setItem(this.shoppingCartKey, JSON.stringify(value));
  }

  private getCartItems(): StorageCartItem[] {
    if (localStorage.getItem(this.shoppingCartKey) == null) {
      return [];
    }

    let data = JSON.parse(localStorage.getItem(this.shoppingCartKey)!);
    return data ? data : [];
  }

  private updateStorage() {
    if (this.disablePropagation) return;
    this.disablePropagation = true;
    this.shoppingCart.next(this.getCartItems());
    this.disablePropagation = false;
  }
}
