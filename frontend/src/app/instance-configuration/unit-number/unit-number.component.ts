import { Component, Input } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UnitCategorisation } from "../../pricing/units";

@Component({
    selector: "app-unit-number",
    templateUrl: "./unit-number.component.html",
    styleUrls: ["./unit-number.component.scss"]
})
export class UnitNumberComponent {

    @Input({ required: true }) unit!: UnitCategorisation;

    numberFormControl: FormControl<string | null> = new FormControl("1",
        [Validators.required, Validators.min(0)]
    );
}
