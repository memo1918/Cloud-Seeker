import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DropdownRegulatorComponent } from "./dropdown-regulator.component";
import { getTestBedDeclarations, getTestBedImports } from "../../testbed.app";
import { Component, ViewChild } from "@angular/core";
import { Field } from "../models/Field";
import { domUpdate, elementToBePresent } from "../../helper.spec";

describe("DropdownRegulatorComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedDeclarations(undefined, [TestComponentWrapper]),
      ...getTestBedImports()
    });
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // disabled for now :(
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  it("should render a dropdown with default 'None' selected", async () => {
    component.field = {
      name: "name1234",
      options: ["option1", "option2", "option3", "option4"],
      type: "dropdown",
      unit: "gb"
    };
    fixture.detectChanges();
    let dropdown = await elementToBePresent("mat-select", fixture) as HTMLElement;
    dropdown.click();
    await domUpdate(fixture);
    expect(dropdown).toBeTruthy();
    expect(dropdown.innerText).toBe("None");
  });

  it("should display the title", async () => {
    component.field = {
      name: "name1234",
      options: ["option1", "option2", "option3", "option4"],
      type: "dropdown",
      unit: "gb"
    };
    fixture.detectChanges();
    let heading = await elementToBePresent("h2.header", fixture) as HTMLElement;
    expect(heading).toBeDefined();
    expect(heading.innerText).toBe("name1234");
  });

  it("should update the name after selecting a instance", async () => {
    component.field = {
      name: "name1234",
      options: ["option1", "option2", "option3", "option4"],
      type: "dropdown",
      unit: "gb"
    };
    fixture.detectChanges();
    let dropdown = await elementToBePresent("mat-select", fixture) as HTMLElement;
    expect(dropdown).toBeTruthy();
    dropdown.click();
    await domUpdate(fixture);
    expect(component.component.filterService.getFilterValue().length).toBe(0);
    expect(dropdown.innerText).toBe("None");
    let options = document.querySelectorAll("mat-option") as NodeListOf<HTMLElement>;

    // expect the dropdown to have 5 options
    expect(options.length).toBe(5);
    // select option1
    options[1].click();
    await domUpdate(fixture);
    expect(dropdown.innerText).toBe("option1");

    expect(component.component.selectedOption.value).toEqual("option1");

    let filterValue = component.component.filterService.getFilterValue();
    expect(filterValue.length).toBe(1);
    expect(filterValue[0].name).toBe("name1234");
    expect(filterValue[0].optionText).toBe("name1234: option1");
  });

  it("should remove the filter if set to none", async () => {
    component.field = {
      name: "name1234",
      options: ["option1", "option2", "option3", "option4"],
      type: "dropdown",
      unit: "gb"
    };
    fixture.detectChanges();
    let dropdown = await elementToBePresent("mat-select", fixture) as HTMLElement;
    expect(dropdown).toBeTruthy();
    let filterService = component.component.filterService;
    expect(filterService.getFilterValue().length).toEqual(0);
    // open dropdown
    dropdown.click();
    await domUpdate(fixture);
    let options = document.querySelectorAll("mat-option") as NodeListOf<HTMLElement>;
    expect(options.length).toEqual(5);

    // select option2
    options[3].click();
    await domUpdate(fixture);
    // check if it added it to the filterservice
    expect(filterService.getFilterValue().length).toEqual(1);

    // opten dropdown
    dropdown.click();
    await domUpdate(fixture);
    options = document.querySelectorAll("mat-option") as NodeListOf<HTMLElement>;

    // select None
    options[0].click();
    await domUpdate(fixture);

    // check if it got removed from the service again
    expect(filterService.getFilterValue().length).toEqual(0);
  });

});

@Component({
  selector: "test-component-wrapper",
  template: `
    <app-dropdown-regulator #instance [field]="field"></app-dropdown-regulator>`
})
class TestComponentWrapper {
  field!: Field;
  @ViewChild("instance") component!: DropdownRegulatorComponent;
}
