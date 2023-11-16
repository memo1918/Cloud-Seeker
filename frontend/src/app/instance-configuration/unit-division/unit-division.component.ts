import { Component, Input } from "@angular/core";
import { UnitCategorisation } from "../../pricing/units";

@Component({
  selector: "app-unit-division",
  templateUrl: "./unit-division.component.html",
  styleUrls: ["./unit-division.component.scss"]
})
export class UnitDivisionComponent {
  @Input({ required: true }) unit!: UnitCategorisation;
  // @Input({ required: true }) name!: string;
}
