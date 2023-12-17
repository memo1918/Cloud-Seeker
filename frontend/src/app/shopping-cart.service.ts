import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {
  CartItem,
  cartItemToStorageCartItem,
  createCartItemFromStorageAndInstance,
  StorageCartItem
} from "./models/cart-item";
import {StorageService} from "./storage.service";
import {APIService} from "./api.service";
import {PromiseQueue} from "./promise-queue";
import {BehaviorSubjectBidirectionalBinding} from "./behavior-subject-bidirectional-binding";
import {asyncMap} from "rxjs-async-map";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  private itemCartRequestQueue = new PromiseQueue();
  private bidirectionalBinding: BehaviorSubjectBidirectionalBinding<BehaviorSubject<CartItem[]>, BehaviorSubject<StorageCartItem[]>>;

  constructor(public storage: StorageService, public api: APIService) {
    //@ts-ignore
    window["ShoppingCartService"] = this;
    this.bidirectionalBinding = new BehaviorSubjectBidirectionalBinding(this.items, this.storage.shoppingCart);

    this.bidirectionalBinding.setPipeB(asyncMap((value: StorageCartItem[]) => new Promise(async (resolve) => {
      this.bidirectionalBinding.propageateB = false;
      let result = await this.mapStorageToInstances(value);
      resolve(result);
      setTimeout(() => {
        this.bidirectionalBinding.propageateB = true;
      }, 0)
    }), 1));

    this.bidirectionalBinding.setPipeA(asyncMap((value: CartItem[]) => new Promise((resolve) => {
      this.bidirectionalBinding.propageateA = false;
      resolve(value.map(cartItemToStorageCartItem))
      setTimeout(() => {
        this.bidirectionalBinding.propageateA = true;
      }, 0)

    }), 1));
  }

  setItems(newItems: CartItem[]) {
    // if (isEqual(newItems, this.getItems())) return;
    this.items.next(newItems);
    // this.storage.setCartItems(newItems);
  }

  getItems() {
    return this.items.getValue();
  }

  getItemsObserver() {
    return this.items.asObservable();
  }

  private async mapStorageToInstances(cartitems: StorageCartItem[]) {
    let skus = cartitems.map(i => i.skus);
    let [skuInstances, error] = await this.api.getInstancesBySKU(skus);
    if (error) {
      console.log(error);
      return [];
    }
    if (skuInstances) {
      let newCartItems: CartItem [] = [];
      for (let i = 0; i < cartitems.length; i++) {
        newCartItems.push(createCartItemFromStorageAndInstance(cartitems[i], skuInstances[i]));
      }
      return newCartItems;
    }
    return [];
  }
}
