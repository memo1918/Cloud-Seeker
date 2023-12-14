import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { valuesIn } from "lodash";
import { InstanceConfigurationComponentDialogData } from "./instance-configuration-component-dialog.data";
import { calculatePricingInformation, findCheapestProvider } from "../models/cart-item";


@Component({
  selector: "app-instance-configuration",
  templateUrl: "./instance-configuration.component.html",
  styleUrls: ["./instance-configuration.component.scss"]
})
export class InstanceConfigurationComponent {

  instanceCountFormControl = new FormControl("1",
    [Validators.required, Validators.min(1)]
  );

  noteFormControl = new FormControl("");

  constructor(public dialogRef: MatDialogRef<InstanceConfigurationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InstanceConfigurationComponentDialogData) {
    this.instanceCountFormControl.setValue(this.data.cart.numberOfInstances.toString());
    this.noteFormControl.setValue(this.data.cart.notes);
    this.noteFormControl.valueChanges.subscribe(() => this.onNotesChanged());
  }

  getFields() {
    let fields: {
      name: string,
      value: string
    }[] = [];
    for (const configurationKey in this.data.cart.instance.fields) {
      let value = this.data.cart.instance.fields[configurationKey];
      fields.push({ name: configurationKey, value: `${value.value} ${value.unit}` });
    }
    return fields;
  }

  onSubmit(_ev: Event) {
    const ev = _ev as SubmitEvent;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();

    calculatePricingInformation(this.data.cart.providers, this.data.cart.instance);
    this.data.cart.selectedProvider = findCheapestProvider(this.data.cart.pricingInformation)!;
    this.data.cart.numberOfInstances = this.instanceCountFormControl.value as any;
    this.dialogRef.close(this.data.cart);
  }

  onClose() {
    this.dialogRef.close(null);
  }

  onNotesChanged() {
    this.data.cart.notes = this.noteFormControl.value!;
  }

  protected readonly valuesIn = valuesIn;

  getInstanceName() {
    return valuesIn(this.data.cart.instance.name).join(" / ");
  }
}
