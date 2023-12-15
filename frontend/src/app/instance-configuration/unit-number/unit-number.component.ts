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


  numberFormControl: FormControl<string | null> = new FormControl("1",
    [Validators.required, Validators.min(0)]
  );

  ngOnInit(): void {
    this.numberFormControl.valueChanges.subscribe(() => this.inputChanged());
  }

  inputChanged() {
    if (this.unit instanceof NumberUnitCategorisation) {
      console.log("number input changed");
      this.unit.value = Number(this.numberFormControl.value);
    }
  }
}
