import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PreviewPanelComponent } from "./preview-panel.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app.module";

describe('PreviewpanelComponent', () => {
  let component: PreviewPanelComponent;
  let fixture: ComponentFixture<PreviewPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    fixture = TestBed.createComponent(PreviewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
