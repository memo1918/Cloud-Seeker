import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem } from "./models/cart-item";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(public storage: StorageService) {
    //@ts-ignore
    window["ShoppingCartService"] = this;
    storage.shoppingCart.subscribe(() => this.storageUpdated());
  }

  setItems(newItems: CartItem[]) {
    this.items.next(newItems);
    this.storage.setCartItems(newItems);
  }

  getItems() {
    return this.items.getValue();
  }

  getItemsObserver() {
    return this.items.asObservable();
  }


  private storageUpdated() {
    // do parsing here
    console.log("CartItems updated");
  }
}
