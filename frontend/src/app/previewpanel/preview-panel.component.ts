import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../header/header.service";

@Component({
  selector: 'app-previewpanel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.scss']
})
export class PreviewPanelComponent implements OnInit {


  showPanel = false;
  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.toggle$.subscribe(
      toggle => this.showPanel = toggle
    )
  }


  public close(){
    this.showPanel = !this.showPanel;
  }

}
