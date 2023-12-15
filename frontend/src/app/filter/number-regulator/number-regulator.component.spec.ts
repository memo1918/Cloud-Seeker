import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getTestBedDeclarations, getTestBedImports } from "../../testbed.app";
import { NumberRegulatorComponent } from "./number-regulator.component";
import { Component, ViewChild } from "@angular/core";
import { Field } from "../models/Field";
import { domUpdate, elementToBePresent } from "../../helper.spec";


describe("PriceRegulatorComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(undefined, [TestComponentWrapper])
    });
    localStorage.clear();
    TestBed.compileComponents();
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.field = { name: "1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    expect(component.component).toBeDefined();
  });

  it("should render the name of the component", async () => {
    component.field = { name: "name1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    let header = await elementToBePresent("h2.header", fixture) as HTMLHeadingElement;
    expect(header).toBeDefined();
    expect(header.innerText).toEqual("name1234");
  });

  it("should render the unit of the field", async () => {
    component.field = { name: "name1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    await elementToBePresent("mat-label", fixture) as HTMLElement;
    let labels = document.querySelectorAll("mat-label") as NodeListOf<HTMLElement>;
    expect(labels.length).toEqual(2);
    expect(labels[0].innerText).toEqual("gb");
    expect(labels[1].innerText).toEqual("gb");
  });

  it("should default to the min/max values", async () => {
    component.field = { name: "name1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    await domUpdate(fixture);
    expect(component.component.min).toBe(1);
    expect(component.component.max).toBe(4);
    expect(component.component.minNumber$.getValue()).toBe(1);
    expect(component.component.maxNumber$.getValue()).toBe(4);

  });

  it("should display the min and max values", async () => {
    component.field = { name: "name1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    await domUpdate(fixture);

    let minTextInput = document.querySelector("[data-number-input-min] input") as HTMLInputElement;
    let maxTextInput = document.querySelector("[data-number-input-max] input") as HTMLInputElement;

    expect(minTextInput.value).toEqual("1");
    expect(maxTextInput.value).toEqual("4");
  });

  it("should update the value if the inputfield changes", async () => {
    component.field = { name: "name1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    await domUpdate(fixture);

    let minTextInput = document.querySelector("[data-number-input-min] input") as HTMLInputElement;
    let maxTextInput = document.querySelector("[data-number-input-max] input") as HTMLInputElement;

    minTextInput.value = "2";
    minTextInput.dispatchEvent(new Event("input"));

    maxTextInput.value = "3";
    maxTextInput.dispatchEvent(new Event("input"));

    await domUpdate(fixture);

    expect(component.component.min).toBe(1);
    expect(component.component.max).toBe(4);
    expect(component.component.minNumber$.getValue()).toBe(2);
    expect(component.component.maxNumber$.getValue()).toBe(3);
  });

  it("should update the slider when inputting a number", async () => {
    component.field = { name: "name1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    await domUpdate(fixture);

    let minTextInput = document.querySelector("[data-number-input-min] input") as HTMLInputElement;
    let maxTextInput = document.querySelector("[data-number-input-max] input") as HTMLInputElement;

    minTextInput.value = "2";
    minTextInput.dispatchEvent(new Event("input"));

    maxTextInput.value = "3";
    maxTextInput.dispatchEvent(new Event("input"));

    await domUpdate(fixture);

    let minSlider = document.querySelector("[data-number-slider-min]") as HTMLInputElement;
    let maxSlider = document.querySelector("[data-number-slider-max]") as HTMLInputElement;

    expect(minSlider).toBeDefined();
    expect(maxSlider).toBeDefined();

    expect(minSlider.value).toBe("2");
    expect(maxSlider.value).toBe("3");

  });
  it("should update the input when sliding a number", async () => {
    component.field = { name: "name1234", options: ["1", "2", "3", "4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    await domUpdate(fixture);


    let minSlider = document.querySelector("[data-number-slider-min]") as HTMLInputElement;
    let maxSlider = document.querySelector("[data-number-slider-max]") as HTMLInputElement;

    minSlider.value = "2";
    minSlider.dispatchEvent(new Event("input"));

    maxSlider.value = "3";
    maxSlider.dispatchEvent(new Event("input"));

    await domUpdate(fixture);

    let minTextInput = document.querySelector("[data-number-input-min] input") as HTMLInputElement;
    let maxTextInput = document.querySelector("[data-number-input-max] input") as HTMLInputElement;

    expect(minTextInput).toBeDefined();
    expect(maxTextInput).toBeDefined();

    expect(minTextInput.value).toBe("2");
    expect(maxTextInput.value).toBe("3");

  });

  it("should detect if the field is with decimal point", async () => {
    component.field = { name: "name1234", options: ["1.1", "2", "3", "4.4"], type: "number", unit: "gb" };
    fixture.detectChanges();
    await domUpdate(fixture);

    expect(component.component.stepSize).toBe(0.1);
  });

  it("should remove invalid characters from the input", async () => {
    component.field = {
      name: "name1234",
      options: ["1.1 aab", "2 ccd", " eef 3", "4t.3fg"],
      type: "number",
      unit: "gb"
    };
    fixture.detectChanges();
    await domUpdate(fixture);
    expect(component.component.stepSize).toBe(0.1);
    expect(component.component.min).toBe(1.1);
    expect(component.component.max).toBe(4.3);
  });
});


@Component({
  selector: "test-component-wrapper",
  template: `
    <app-number-regulator #instance [field]="field"></app-number-regulator>`
})
class TestComponentWrapper {
  field!: Field;
  @ViewChild("instance") component!: NumberRegulatorComponent;
}
