import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitDivisionComponent } from "./unit-division.component";
import { Component } from "@angular/core";
import { DivisionUnitCategorisation } from "../../pricing/divisionunitcategorisation";
import { getTestBedImports } from "../../testbed.app";

describe("UnitDivisionComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      declarations: [UnitDivisionComponent, TestComponentWrapper],
    });
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    let element = fixture.nativeElement as HTMLElement;
    expect(element.innerText.trim()).toBe("per");
  });
});

@Component({
  selector: "test-component-wrapper",
  template: "<app-unit-division [unit]=\"unit\"></app-unit-division>"
})
class TestComponentWrapper {
  unit = DivisionUnitCategorisation.create("/");
}
