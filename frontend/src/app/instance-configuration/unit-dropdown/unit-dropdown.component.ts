import { Component, Input } from "@angular/core";
import { UnitCategorisation } from "src/app/pricing/units";

@Component({
    selector: "app-unit-dropdown",
    templateUrl: "./unit-dropdown.component.html",
    styleUrls: ["./unit-dropdown.component.scss"]
})
export class UnitDropdownComponent {
    @Input({ required: true }) unit!: UnitCategorisation;
  // @Input({ required: true }) name!: string;
}
