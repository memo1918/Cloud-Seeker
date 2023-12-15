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
    this.updateStorage();
  }

  public setCartItems(shoppingCart: CartItem[]) {
    localStorage.setItem(this.shoppingCartKey, JSON.stringify(shoppingCart.map(cartItemToStorageCartItem)));
  }

  private getCartItems(): StorageCartItem[] {
    if (localStorage.getItem(this.shoppingCartKey) == null) {
      return [];
    }

    let data = JSON.parse(localStorage.getItem(this.shoppingCartKey)!);
    return data ? data : [];
  }

  private updateStorage() {
    this.shoppingCart.next(this.getCartItems());
  }
}
