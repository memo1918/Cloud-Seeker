import { Component } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { FormControl, Validators } from "@angular/forms";
import { Unit } from "../pricing/unit";
import { Units } from "../pricing/units";

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

    constructor(public configuration: ConfigurationService) {
        this.parseUnits();
    }

    private parseUnits() {
        for (const priceKey in this.configuration.instanceComparison.price) {
            const price = this.configuration.instanceComparison.price[priceKey];
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
        for (const configurationKey in this.configuration.instanceComparison.fields) {
            let value = this.configuration.instanceComparison.fields[configurationKey];
            fields.push({ name: configurationKey, value: `${value.value} ${value.unit}` });
        }
        return fields;
    }

    onSubmit(_ev: Event) {
        const ev = _ev as SubmitEvent;
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        console.log(this.pricingConfigurations);

        console.log(this.pricingConfigurations.map(i => {
            return { providerName: i.providerName, factor: i.providerDefault.getFactorForConversion(i.configuration) };
        }));
    }
}
