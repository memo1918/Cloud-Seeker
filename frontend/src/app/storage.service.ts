import {EventEmitter, Injectable} from "@angular/core";
import {CartItem, cartItemToStorageCartItem, StorageCartItem} from "./models/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private shoppingCartKey = "SHOPPING_CART_CONFIGURATION";
  public shoppingCart: EventEmitter<StorageCartItem[]> = new EventEmitter<StorageCartItem[]>();
  constructor() {
    // triggered when other tab makes a change
    window.addEventListener("storage", (event) => {
      this.invokeStorageChanged(event);
    });
  }

  public setCartItems(shoppingCart: CartItem[]) {
    let value = shoppingCart.map(cartItemToStorageCartItem);
    localStorage.setItem(this.shoppingCartKey, JSON.stringify(value))
  }


  public getCartItems(): StorageCartItem[] {
    if (localStorage.getItem(this.shoppingCartKey) == null) {
      return [];
    }

    let data = JSON.parse(localStorage.getItem(this.shoppingCartKey)!);
    return data ? data : [];
  }

  private invokeStorageChanged(event: StorageEvent) {
    switch (event.key) {
      case this.shoppingCartKey:
        this.shoppingCart.emit(this.getCartItems());
        break;
      default:
        console.log("StorageService: Unknown storage event", event)
    }
  }

}
