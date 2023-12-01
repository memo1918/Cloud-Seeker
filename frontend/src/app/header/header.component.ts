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

  constructor(public service: HeaderService, public shoppingCart: ShoppingCartService) {}

  public openPanel() {
    this.service.toggle.next(true);
  }
}


