import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CartItem} from "./models/cart-item";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    private items: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([])

    constructor() {
        //@ts-ignore
        window["ShoppingCartService"] = this;
    }

    setItems(newItems: CartItem[]) {
        this.items.next(newItems);
    }

    getItems() {
        return this.items.getValue();
    }

    getItemsObserver() {
        return this.items.asObservable();
    }


}
