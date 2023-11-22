import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { InstanceComparison } from "../instance-comparison";
import { InstanceConfigurationComponent } from "../instance-configuration.component";
import { INSTANCE_COMPARISON_FIXTURE } from "../../fixtures/instance-comparison.fixture";

@Component({
  selector: "app-instance-configuration-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {

  public dialogRef: MatDialogRef<InstanceConfigurationComponent, any> | undefined;

  constructor(public dialog: MatDialog) {
  }

  openDialog(instance: InstanceComparison) {
    return new Promise<MatDialogRef<InstanceConfigurationComponent, any>>((resolve) => {
      const dialogRef = this.dialog.open(InstanceConfigurationComponent, {
        data: { instance }
      });
      this.dialogRef = dialogRef;

      this.dialogRef.afterOpened().subscribe(() => {
        resolve(dialogRef);
      });

      this.dialogRef.afterClosed().subscribe(result => {
        console.log("The dialog was closed", result);
        this.dialogRef = undefined;
      });
    });
  }

  protected readonly INSTANCE_COMPARISON_FIXTURE = INSTANCE_COMPARISON_FIXTURE;
}
