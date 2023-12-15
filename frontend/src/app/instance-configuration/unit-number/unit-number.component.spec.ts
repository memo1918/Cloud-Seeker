import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitNumberComponent } from "./unit-number.component";
import { Component, ViewChild } from "@angular/core";
import { NumberUnitCategorisation } from "../../pricing/numberunitcategorisation";
import { getTestBedImports } from "../../testbed.app";

describe("UnitNumberComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      declarations: [UnitNumberComponent, TestComponentWrapper],
    });
    localStorage.clear();
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should render the number", () => {
    let input = document.querySelector("[data-unit-number]") as HTMLInputElement;
    expect(input.value).toBe((component.unit as NumberUnitCategorisation).value + "");
  });
  it("should update the unit", () => {
    let input = document.querySelector("[data-unit-number]") as HTMLInputElement;
    input.value = "5678";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.unitNumberComponent.numberFormControl.value as any).toBe(5678);
  });
});

@Component({
  selector: "test-component-wrapper",
  template: "<app-unit-number #unitnumber [unit]=\"unit\"></app-unit-number>"
})
class TestComponentWrapper {
  unit = NumberUnitCategorisation.create("1");
  @ViewChild("unitnumber") unitNumberComponent!: UnitNumberComponent;
}
