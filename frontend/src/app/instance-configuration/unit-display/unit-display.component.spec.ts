import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitDisplayComponent } from "./unit-display.component";
import { Unit } from "../../pricing/unit";
import { Component } from "@angular/core";
import { CustomUnitCategorisation } from "../../pricing/customunitcategorisation";
import { getTestBedImports } from "../../testbed.app";

describe("UnitDisplayComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let unit: Unit;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDisplayComponent, TestComponentWrapper],
      ...getTestBedImports()
    });
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: "test-component-wrapper",
  template: "<app-unit-display [unit]=\"unit\"></app-unit-display>"
})
class TestComponentWrapper {
  unit = CustomUnitCategorisation.create("hugendubel");
}
