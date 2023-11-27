import {Component} from '@angular/core';
import { HeaderService } from "./header.service";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string = 'Cloud-Comparison-Tool';

  constructor(private service: HeaderService, public shoppingCart: ShoppingCartService) {}

  public open() {
    this.service.toggle.next(true);
  }
}


