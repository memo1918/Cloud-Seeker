import { Component, OnChanges, OnInit,SimpleChanges } from "@angular/core";
import { HeaderService } from "../header/header.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Subscription } from "rxjs";
import { InstanceComparison } from "../models/instance-comparison";


@Component({
  selector: 'app-previewpanel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.scss']
})
export class PreviewPanelComponent implements OnInit {
  showPanel = false;
  items: InstanceComparison[] = [];

  constructor(private headerService: HeaderService, private shoppingCart: ShoppingCartService) {
  }

  ngOnInit() {
    this.headerService.toggle$.subscribe((toggle) => (this.showPanel = toggle));
    this.shoppingCart.items$.subscribe((itemList)=> {
      this.items = itemList;
      console.log(this.items.length);
    });
  }

  public close() {
    this.showPanel = false; // Always set to false when closing
  }

}
