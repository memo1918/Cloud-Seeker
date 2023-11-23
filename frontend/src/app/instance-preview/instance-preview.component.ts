import { Component } from "@angular/core";
import { InstancePreviewService } from "./instance-preview.service";
import { toPairs, valuesIn } from "lodash";

@Component({
  selector: "app-instance-preview",
  templateUrl: "./instance-preview.component.html",
  styleUrls: ["./instance-preview.component.scss"]
})
export class InstancePreviewComponent {
  title = "instance-preview";

  constructor(public instanceService: InstancePreviewService) {
  }

  protected readonly toPairs = toPairs;
    protected readonly valuesIn = valuesIn;
}

/*
list in div and display to flex
 */

