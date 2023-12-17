import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CartItem, createCartItemFromStorageAndInstance, StorageCartItem} from "./models/cart-item";
import {StorageService} from "./storage.service";
import {APIService} from "./api.service";
import {PromiseQueue} from "./promise-queue";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  private itemCartRequestQueue = new PromiseQueue();

  constructor(public storage: StorageService, public api: APIService) {
    //@ts-ignore
    window["ShoppingCartService"] = this;

    const cartItems = storage.getCartItems();
    this.mapStorageToInstances(cartItems).then((cartItems) => {
      this.setItems(cartItems);
      this.storage.shoppingCart.subscribe((cartItems) => this.storageUpdated(cartItems));
    });
  }

  private async storageUpdated(cartItems: StorageCartItem[]) {
    this.itemCartRequestQueue.enqueue(async () => {
      const parsedItems = await this.mapStorageToInstances(cartItems);
      this.setItems(parsedItems);
    });
  };


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

  private async mapStorageToInstances(cartItems: StorageCartItem[]) {
    let skus = cartItems.map(i => i.skus);
    let [skuInstances, error] = await this.api.getInstancesBySKU(skus);
    if (error) {
      console.log(error);
      return [];
    }
    if (skuInstances) {
      let newCartItems: CartItem [] = [];
      for (let i = 0; i < cartItems.length; i++) {
        newCartItems.push(createCartItemFromStorageAndInstance(cartItems[i], skuInstances[i]));
      }
      return newCartItems;
    }
    return [];
  }
}
