import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Unit } from "../pricing/unit";
import { Units } from "../pricing/units";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { valuesIn } from "lodash";
import { InstanceComparison } from "../models/instance-comparison";

@Component({
  selector: "app-instance-configuration",
  templateUrl: "./instance-configuration.component.html",
  styleUrls: ["./instance-configuration.component.scss"]
})
export class InstanceConfigurationComponent {


  public noteText: string = "";
  instanceCountFormControl = new FormControl("1",
    [Validators.required, Validators.min(1)]
  );

  private pricingConfigurations: {
    providerName: string,
    providerDefault: Unit,
    configuration: Unit,
  }[] = [];

  public displayPricingConfigurations: {
    providerName: string,
    providerDefault: Unit,
    configuration: Unit,
  }[] = [];

  constructor(public dialogRef: MatDialogRef<InstanceConfigurationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { instance: InstanceComparison }) {
    this.parseUnits();
  }

  private parseUnits() {
    for (const priceKey in this.data.instance.price) {
      const price = this.data.instance.price[priceKey];
      this.pricingConfigurations.push({
        providerName: priceKey,
        providerDefault: Units.categorise(price.unit),
        configuration: Units.categorise(price.unit)
      });
    }

    defaultConfigurationLoop: for (const pricingConfiguration of this.pricingConfigurations) {
      for (const displayPricingConfiguration of this.displayPricingConfigurations) {
        if (pricingConfiguration.configuration.isCompatible(displayPricingConfiguration.configuration)) {
          pricingConfiguration.configuration = displayPricingConfiguration.configuration;
          displayPricingConfiguration.providerName += "/" + pricingConfiguration.providerName;
          continue defaultConfigurationLoop;
        }
      }
      this.displayPricingConfigurations.push({ ...pricingConfiguration });
    }
  }

  getFields() {
    let fields: {
      name: string,
      value: string
    }[] = [];
    for (const configurationKey in this.data.instance.fields) {
      let value = this.data.instance.fields[configurationKey];
      fields.push({ name: configurationKey, value: `${value.value} ${value.unit}` });
    }
    return fields;
  }

  onSubmit(_ev: Event) {
    const ev = _ev as SubmitEvent;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();

    this.pricingConfigurations;
    let pricingResult = this.pricingConfigurations.map(i => {
      let factor = i.providerDefault.getFactorForConversion(i.configuration);
      return {
        providerName: i.providerName,
        factor,
        price: Number(this.data.instance.price[i.providerName].value) * factor
      };
    });
    this.dialogRef.close({ units: this.pricingConfigurations, adjustedPricing: pricingResult });
  }

  onClose() {
    this.dialogRef.close(null);
  }

    protected readonly valuesIn = valuesIn;
}
