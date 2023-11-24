import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { InstanceConfigurationComponent } from "../instance-configuration.component";
import { InstanceComparison } from "src/app/models/instance-comparison";
import {CartItem} from "../../models/cart-item";
import {ShoppingCartService} from "../../shopping-cart.service";
import {Unit} from "../../pricing/unit";

@Component({
  selector: "app-instance-configuration-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {

  public dialogRef: MatDialogRef<InstanceConfigurationComponent, any> | undefined;
  @Input({ required: true }) public instance!: InstanceComparison;

  constructor(public dialog: MatDialog, public shoppingCart: ShoppingCartService) {
  }

  openDialog() {
    return new Promise<MatDialogRef<InstanceConfigurationComponent, any>>((resolve) => {
      const dialogRef = this.dialog.open(InstanceConfigurationComponent, {
        data: { instance: this.instance }
      });
      this.dialogRef = dialogRef;

      this.dialogRef.afterOpened().subscribe(() => {
        resolve(dialogRef);
      });

      this.dialogRef.afterClosed().subscribe((result) => {

        console.log("The dialog was closed", result);

        let pricing = result.adjustedPricing as { providerName: string, factor: number, price: number }[]
        let units = result.units as {
          configuration: Unit;
          providerName: string;
          providerDefault: Unit;
        }

        let cartItem: CartItem = {
          instance: this.instance,
          pricingInformation: {},
          units: units,
          selectedProvider: "aws",
          notes: result.notes
        }

        for (const pricingElement of pricing) {
          cartItem.pricingInformation[pricingElement.providerName] = {
            factor: pricingElement.factor,
            price: pricingElement.price
          };
        }

        let items = this.shoppingCart.getItems()
        items.push(cartItem);
        this.shoppingCart.setItems(items);

        this.dialogRef = undefined;
      });
    });
  }

}
