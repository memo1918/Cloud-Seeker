import { CartItem } from "../models/cart-item";
import { ShoppingCartDummyItemsFixture } from "../fixtures/shopping-cart-dummy-items-fixture";
import { PromiseQueue } from "../promise-queue";
import { BehaviorSubject, Observable } from "rxjs";

// this is the shopping cart dummy service
// it is used for testing purposes
// it is used to mock the shopping cart service
// it holds the dummy items in the shopping cart
// it also saves the most recent instance of the shopping cart service in the window object
export class ShoppingCartDummyService {
  // the instance of the shopping cart dummy service
  public static Instance: ShoppingCartDummyService;
  // the constructor of the shopping cart dummy service
  // we do no need additional services in the constructor
  constructor() {
    ShoppingCartDummyService.Instance = this;
    this.setItems(ShoppingCartDummyItemsFixture);
  }

  // this function is not implemented in the shopping cart dummy service
  private itemCartRequestQueue: PromiseQueue = new PromiseQueue();
  // this variable holds the items in the shopping cart
  private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  // this function returns the items in the shopping cart
  getItems(): CartItem[] {
    return this.items.getValue();
  }

  // this function returns the items in the shopping cart as an observable
  getItemsObserver(): Observable<CartItem[]> {
    return this.items.asObservable();
  }

  // this function sets new items to the shopping cart
  setItems(newItems: CartItem[]): void {
    this.items.next(newItems);
  }

  // this function adds an item to the shopping cart
  private storageUpdated(): void {
  }
}

