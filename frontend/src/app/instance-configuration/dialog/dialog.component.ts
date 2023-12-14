import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { InstanceConfigurationComponent } from "../instance-configuration.component";
import { InstanceComparison } from "src/app/models/instance-comparison";
import { CartItem } from "../../models/cart-item";
import { ShoppingCartService } from "../../shopping-cart.service";
import { InstanceConfigurationResult } from "../instance-configuration-result";

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
        data: { instance: this.instance },
        panelClass: 'custom-dialog-container',
        height: '80%',
        width: '80%'
      });
      this.dialogRef = dialogRef;

      this.dialogRef.afterOpened().subscribe(() => {
        resolve(dialogRef);
      });

      this.dialogRef.afterClosed().subscribe((result: InstanceConfigurationResult | null) => {

        console.log("The dialog was closed", result);
        if (result == null) return;

        let pricing = result.adjustedPricing;
        let units = result.units;


        let cartItem: CartItem = {
          instance: this.instance,
          pricingInformation: {},
          units: units,
          selectedProvider: pricing[0].providerName,
          notes: result.notes,
          numberOfInstances: result.numberOfInstances
        }

        for (const pricingElement of pricing) {
          cartItem.pricingInformation[pricingElement.providerName] = {
            factor: pricingElement.factor,
            price: pricingElement.price
          };
          if (pricingElement.price < cartItem.pricingInformation[cartItem.selectedProvider].price) {
            cartItem.selectedProvider = pricingElement.providerName;
          }
        }

        let items = this.shoppingCart.getItems()
        items.push(cartItem);
        this.shoppingCart.setItems(items);

        this.dialogRef = undefined;
      });
    });
  }

}
