import { Component, Input } from "@angular/core";

@Component({
  selector: "app-field-display",
  templateUrl: "./field-display.component.html",
  styleUrls: ["./field-display.component.scss"]
})
export class FieldDisplayComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) value!: string;
}
