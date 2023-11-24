import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {InstanceComparison} from "./models/instance-comparison";
import {CartItem} from "./models/cart-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([])

  constructor() {
  }

  setItems(newItems: CartItem[]){
    this.items.next(newItems);
  }

  getItems(){
    return this.items.getValue();
  }

  getItemsObserver(){
    return this.items.asObservable();
  }


}
