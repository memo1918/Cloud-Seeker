/*
Instance preview to-do:
Implement Category filter functionality display
Implement functionality of slider filters
Implement Figma design
Test
 */

import { Component} from "@angular/core";
import { InstancePreviewService } from "./instance-preview.service";
@Component({
  selector: 'app-instance-preview',
  templateUrl: './instance-preview.component.html',
  styleUrls: ['./instance-preview.component.scss']
})
export class InstancePreviewComponent {
    title = "instance-preview";
    constructor(public instanceService : InstancePreviewService ) {  }
}
