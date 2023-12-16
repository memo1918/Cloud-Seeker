import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem, createCartItemFromStorageAndInstance } from "./models/cart-item";
import { StorageService } from "./storage.service";
import { APIService } from "./api.service";
import { PromiseQueue } from "./promise-queue";
import { isEqual } from "lodash";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  private itemCartRequestQueue = new PromiseQueue();

  constructor(public storage: StorageService, public api: APIService) {
    //@ts-ignore
    window["ShoppingCartService"] = this;
    storage.shoppingCart.subscribe(() => this.storageUpdated());
  }

  setItems(newItems: CartItem[]) {
    if (isEqual(newItems, this.getItems())) return;
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

    this.itemCartRequestQueue.enqueue(async () => {
      let cartitems = this.storage.shoppingCart.getValue();
      let skus = cartitems.map(i => i.skus);
      let [skuInstances, error] = await this.api.getInstancesBySKU(skus);
      if (error) {
        console.log(error);
        return;
      }
      if (skuInstances) {
        let newCartItems: CartItem [] = [];
        for (let i = 0; i < cartitems.length; i++) {
          newCartItems.push(createCartItemFromStorageAndInstance(cartitems[i], skuInstances[i]));
        }
        this.setItems(newCartItems);
      }
      console.log("CartItems updated");
    });
  }
}
