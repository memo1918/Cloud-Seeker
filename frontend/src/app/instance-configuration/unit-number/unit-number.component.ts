import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UnitCategorisation } from "../../pricing/units";
import { NumberUnitCategorisation } from "../../pricing/numberunitcategorisation";

@Component({
    selector: "app-unit-number",
    templateUrl: "./unit-number.component.html",
    styleUrls: ["./unit-number.component.scss"]
})
export class UnitNumberComponent implements OnInit {

    @Input({ required: true }) unit!: UnitCategorisation;
    @Input({ required: true }) name!: string;

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

    ngOnInit(): void {
        // this.numberFormControl =

        // if (this.unit instanceof NumberUnitCategorisation) {
        //     this.numberFormControl = new FormControl(this.unit.value.toString(),
        //         [Validators.required, Validators.min(0)]
        //     );
        // }
        // this.numberFormControl.valueChanges.subscribe(console.log);
    }
}
