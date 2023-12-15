import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterComponent } from "./filter.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { Component, Input } from "@angular/core";
import { Field } from "./models/Field";
import { NumberRegulatorComponent } from "./number-regulator/number-regulator.component";
import { DropdownRegulatorComponent } from "./dropdown-regulator/dropdown-regulator.component";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";

const ENABLE_DEBUGGER = false;

describe("FilterComponent", () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestNumberRegulatorComponentMock.instances = [];
    TestDropdownRegulatorComponentMock.instances = [];
    localStorage.clear();
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      ...getTestBedDeclarations([
        [NumberRegulatorComponent, TestNumberRegulatorComponentMock],
        [DropdownRegulatorComponent, TestDropdownRegulatorComponentMock]
      ]),
      ...getTestBedImports()
    });

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display all regulators", async () => {
    fixture.detectChanges();
    if (ENABLE_DEBUGGER) debugger;
    await fixture.whenStable();
    await domUpdate(fixture);
    await elementToBePresent("app-number-regulator", fixture);
    if (ENABLE_DEBUGGER) debugger;
    let numberOperators = document.querySelectorAll("app-number-regulator") as NodeListOf<HTMLElement>;
    let dropdownOperators = document.querySelectorAll("app-dropdown-regulator") as NodeListOf<HTMLElement>;
    let listItems = document.querySelectorAll("mat-list-item") as NodeListOf<HTMLElement>;
    expect(numberOperators.length).toBe(3);
    expect(dropdownOperators.length).toBe(4);

    expect(listItems.length).toBe(numberOperators.length + dropdownOperators.length);
    if (ENABLE_DEBUGGER) debugger;
  });

  it("should pass the correct field to the operators", async () => {
    fixture.detectChanges();
    await domUpdate(fixture);
    await elementToBePresent("app-number-regulator", fixture);
    let instances: [
      TestNumberRegulatorComponentMock,
      TestDropdownRegulatorComponentMock,
      TestDropdownRegulatorComponentMock,
      TestNumberRegulatorComponentMock,
      TestDropdownRegulatorComponentMock,
      TestNumberRegulatorComponentMock,
      TestDropdownRegulatorComponentMock
    ] = [
      TestNumberRegulatorComponentMock.instances[0],
      TestDropdownRegulatorComponentMock.instances[0],
      TestDropdownRegulatorComponentMock.instances[1],
      TestNumberRegulatorComponentMock.instances[1],
      TestDropdownRegulatorComponentMock.instances[2],
      TestNumberRegulatorComponentMock.instances[2],
      TestDropdownRegulatorComponentMock.instances[3]
    ];
    expect(component.filterService.currentCategoryFields).toBeDefined();
    let i = 0;
    for (const currentCategoryField of component.filterService.currentCategoryFields!) {
      expect(instances[i++].field).toBe(currentCategoryField);
    }
  });
});

@Component({
  selector: "app-number-regulator",
  template: "<p>app-number-regulator</p>"
})
class TestNumberRegulatorComponentMock {
  static instances: TestNumberRegulatorComponentMock[] = [];
  @Input({ required: true }) field!: Field;

  constructor() {
    TestNumberRegulatorComponentMock.instances.push(this);
  }
}

@Component({
  selector: "app-dropdown-regulator",
  template: "<p>app-dropdown-regulator</p>"
})
class TestDropdownRegulatorComponentMock {
  static instances: TestDropdownRegulatorComponentMock[] = [];
  @Input({ required: true }) field!: Field;

  constructor() {
    TestDropdownRegulatorComponentMock.instances.push(this);
  }
}
