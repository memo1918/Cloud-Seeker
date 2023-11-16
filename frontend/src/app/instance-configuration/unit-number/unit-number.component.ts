import { Component, Input } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UnitCategorisation } from "../../pricing/units";
import { NumberUnitCategorisation } from "../../pricing/numberunitcategorisation";

@Component({
    selector: "app-unit-number",
    templateUrl: "./unit-number.component.html",
    styleUrls: ["./unit-number.component.scss"]
})
export class UnitNumberComponent {

    @Input({ required: true }) unit!: UnitCategorisation;
  // @Input({ required: true }) name!: string;

    numberFormControl: FormControl<string | null> = new FormControl("1",
        [Validators.required, Validators.min(0)]
    );

    private valueChanged() {
        console.log("test");
        let value = Number(this.numberFormControl.value);
        if (isNaN(value)) return;
        if (this.unit instanceof NumberUnitCategorisation) {
            this.unit.selected = this.numberFormControl.value || "1";
        }
    }
}
