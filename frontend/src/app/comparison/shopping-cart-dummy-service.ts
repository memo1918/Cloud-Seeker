import { CartItem } from "../models/cart-item";
import { ShoppingCartDummyItemsFixture } from "../fixtures/shopping-cart-dummy-items-fixture";
import { PromiseQueue } from "../promise-queue";
import { BehaviorSubject, Observable } from "rxjs";

export class ShoppingCartDummyService {
  public static Instance: ShoppingCartDummyService;

  constructor() {
    ShoppingCartDummyService.Instance = this;
    this.setItems(ShoppingCartDummyItemsFixture);
  }

  private itemCartRequestQueue: PromiseQueue = new PromiseQueue();
  private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  getItems(): CartItem[] {
    return this.items.getValue();
  }

  getItemsObserver(): Observable<CartItem[]> {
    return this.items.asObservable();
  }

  setItems(newItems: CartItem[]): void {
    this.items.next(newItems);
  }

  private storageUpdated(): void {
  }
}

