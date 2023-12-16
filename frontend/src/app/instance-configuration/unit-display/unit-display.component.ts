import { Component, Input, OnInit } from "@angular/core";
import { UnitCategorisation } from "../../pricing/units";
import { DefaultUnitCategorisation } from "../../pricing/defaultunitcategorisation";
import { CustomUnitCategorisation } from "../../pricing/customunitcategorisation";

@Component({
  selector: "app-unit-display",
  templateUrl: "./unit-display.component.html",
  styleUrls: ["./unit-display.component.scss"]
})
export class UnitDisplayComponent implements OnInit {
  @Input({ required: true }) unit!: UnitCategorisation;
  displayText: string = "";

  ngOnInit(): void {
    if (this.unit instanceof DefaultUnitCategorisation) {
      this.displayText = this.unit.token;
    } else if (this.unit instanceof CustomUnitCategorisation) {
      this.displayText = `${this.unit.value} (${this.unit.token})`;
    }
  }

}
