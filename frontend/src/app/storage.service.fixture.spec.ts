import {CartItem, cartItemToStorageCartItem, StorageCartItem} from "./models/cart-item";
import {EventEmitter} from "@angular/core";

export class MockStorageService{
  public shoppingCart: EventEmitter<StorageCartItem[]> = new EventEmitter<StorageCartItem[]>();
  private shoppingCartKey: string = "SHOPPING_CART_CONFIGURATION";
  public storage: { [key: string]: string } = {};

  constructor() {
    // triggered when other tab makes a change
    window.addEventListener("storage", (event) => {
      this.invokeStorageChanged(event);
    });
  }

  public setCartItems(shoppingCart: CartItem[]) {
    let value = shoppingCart.map(cartItemToStorageCartItem);
    this.storage[this.shoppingCartKey] = JSON.stringify(value)
  }


  public getCartItems(): StorageCartItem[] {

    if (this.storage[this.shoppingCartKey] == null) {
      return [];
    }

    let data = JSON.parse(this.storage[this.shoppingCartKey]);
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
