import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DropdownRegulatorComponent } from "./dropdown-regulator.component";
import { getTestBedDeclarations, getTestBedImports, getTestBedProviders } from "../../testbed.app";
import { Component, ViewChild } from "@angular/core";
import { Field } from "../models/Field";
import { domUpdate, elementToBePresent } from "../../helper.spec";
import { FetchMockSpec } from "../../fetch.mock.spec";
import { dummyApplicationData } from "../../mocks/fetch/applicationdummydata.spec";

// this is the test module for the dropdown regulator component
// it tests the dropdown regulator component
describe("DropdownRegulatorComponent", () => {
  // the component instance
  let component: TestComponentWrapper;
  // the angular fixture used for detecting changes
  let fixture: ComponentFixture<TestComponentWrapper>;
  // before each test
  // create a new instance of the dropdown regulator component that mocks our backend
  // set the spy on the fetch mock spec
  // set the response data to the dummy application data
  // configure the test bed
  // create the fixture
  // create the component instance
  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      // we add the test component wrapper to the declarations, so we can test the dropdown regulator component
      ...getTestBedDeclarations(undefined, [TestComponentWrapper]),
      ...getTestBedImports(),
      ...getTestBedProviders()
    });
    // we clear the local storage before each test
    localStorage.clear();
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // disabled for now :(
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  it("should render a dropdown with default 'None' selected", async () => {
    // we set the field to a field with a dropdown type
    // we set the options to 4 options
    component.field = {
      name: "name1234",
      options: ["option1", "option2", "option3", "option4"],
      type: "dropdown",
      unit: "gb"
    };
    fixture.detectChanges();
    // we wait for the dom to update
    // and expect the dropdown to be present
    let dropdown = await elementToBePresent("mat-select", fixture) as HTMLElement;
    // we click the dropdown
    dropdown.click();
    // we wait for the dropdown to open
    await domUpdate(fixture);
    // we check if the inner text is None
    expect(dropdown.innerText).toBe("None");
  });

  it("should display the title", async () => {
    // we set the field to a field with a dropdown type
    // we set the options to 4 options
    component.field = {
      name: "name1234",
      options: ["option1", "option2", "option3", "option4"],
      type: "dropdown",
      unit: "gb"
    };
    fixture.detectChanges();
    let heading = await elementToBePresent("h2.header", fixture) as HTMLElement;
    expect(heading).toBeDefined();
    // we check if the label is name1234
    expect(heading.innerText).toBe("name1234");
  });

  it("should update the name after selecting a instance", async () => {
    // we set the field to a field with a dropdown type
    // we set the options to 4 options
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
    // we see if the filter is empty
    expect(component.component.filterService.getFilterValue().length).toBe(0);
    // we check if the dropdown has 5 options and None is selected
    expect(dropdown.innerText).toBe("None");
    let options = document.querySelectorAll("mat-option") as NodeListOf<HTMLElement>;

    // expect the dropdown to have 5 options
    expect(options.length).toBe(5);
    // select option1
    options[1].click();
    await domUpdate(fixture);
    expect(dropdown.innerText).toBe("option1");
    // expect that option1 is selected
    expect(component.component.selectedOption.value).toEqual("option1");
    //
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

// this is the test component wrapper
// it is used to test the dropdown regulator component
// it is used for setting the field of the dropdown regulator component
@Component({
  selector: "test-component-wrapper",
  template: `
    <app-dropdown-regulator #instance [field]="field"></app-dropdown-regulator>`
})
class TestComponentWrapper {
  field!: Field;
  @ViewChild("instance") component!: DropdownRegulatorComponent;
}
