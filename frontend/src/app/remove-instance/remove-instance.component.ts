import {Component, Input} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {CartItem} from "../models/cart-item";

@Component({
  selector: 'app-remove-instance',
  templateUrl: './remove-instance.component.html',
  styleUrls: ['./remove-instance.component.scss']
})
export class RemoveInstanceComponent {
  @Input({required: true}) cartItem!: CartItem
  constructor(public shoppingCartService: ShoppingCartService) {
  }
  public remove() {
    let items = this.shoppingCartService.getItems();
    items = items.filter(i => i != this.cartItem);
    this.shoppingCartService.setItems(items);
  }
}
