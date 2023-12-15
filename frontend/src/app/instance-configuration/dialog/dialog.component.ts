import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { InstanceConfigurationComponent } from "../instance-configuration.component";
import { InstanceComparison } from "src/app/models/instance-comparison";
import { CartItem, createCartItemFromInstance } from "../../models/cart-item";
import { ShoppingCartService } from "../../shopping-cart.service";
import { InstanceConfigurationComponentDialogData } from "../instance-configuration-component-dialog-data";

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
      let instanceConfigurationComponentDialogData: InstanceConfigurationComponentDialogData = {
        cart: createCartItemFromInstance(this.instance)
      };

      const dialogRef = this.dialog.open(InstanceConfigurationComponent, {
        data: instanceConfigurationComponentDialogData,
        panelClass: 'custom-dialog-container',
        height: '80%',
        width: '80%'
      });
      this.dialogRef = dialogRef;

      this.dialogRef.afterOpened().subscribe(() => {
        resolve(dialogRef);
      });

      this.dialogRef.afterClosed().subscribe((result: CartItem | null) => {
        if (result == null) return;

        let items = this.shoppingCart.getItems();
        items.push(result);
        this.shoppingCart.setItems(items);

        this.dialogRef = undefined;
      });
    });
  }

}
