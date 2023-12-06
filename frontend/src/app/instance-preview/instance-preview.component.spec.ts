import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstancePreviewComponent } from "./instance-preview.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";

describe("InstancePreviewComponent", () => {
  let component: InstancePreviewComponent;
  let fixture: ComponentFixture<InstancePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    fixture = TestBed.createComponent(InstancePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
