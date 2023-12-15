import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstanceConfigurationComponent } from "./instance-configuration.component";
import { Component } from "@angular/core";
import { INSTANCE_COMPARISON_FIXTURE } from "../fixtures/instance-comparison.fixture";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { InstanceComparison } from "../models/instance-comparison";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { createCartItemFromInstance } from "../models/cart-item";
import { InstanceConfigurationComponentDialogData } from "./instance-configuration-component-dialog-data";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { domUpdate } from "../helper.spec";

describe("InstanceConfigurationComponent", () => {
  let component: DialogWrapperComponent;
  let fixture: ComponentFixture<DialogWrapperComponent>;
  let dialogContent: InstanceConfigurationComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations([], [DialogWrapperComponent]),
      providers: [
        MatDialog
      ],
    });
    localStorage.clear();
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    fixture = TestBed.createComponent(DialogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // element = fixture.nativeElement as HTMLElement;
    await component.openDialog(INSTANCE_COMPARISON_FIXTURE);
    dialogContent = component.dialogRef.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show the name of the instance", () => {
    expect(document.querySelector("[data-instance-name]")?.textContent?.trim())
      .toContain(INSTANCE_COMPARISON_FIXTURE.name["aws"]);
    expect(document.querySelector("[data-instance-name]")?.textContent?.trim())
      .toContain(INSTANCE_COMPARISON_FIXTURE.name["gcp"]);
    expect(document.querySelector("[data-instance-name]")?.textContent?.trim())
      .toContain(INSTANCE_COMPARISON_FIXTURE.name["azure"]);
  });

  it("should render all instance information display elements", () => {

    expect(document.querySelectorAll("app-field-display").length).toBe(2);
  });
  it("should render all instance pricing configuration elements", () => {
    expect(document.querySelectorAll("app-unit-display").length).toBe(0);
    expect(document.querySelectorAll("app-unit-division").length).toBe(1);
    expect(document.querySelectorAll("app-unit-dropdown").length).toBe(2);
    expect(document.querySelectorAll("app-unit-number").length).toBe(3);
  });
  it("should save the notes to the property and back", () => {
    let textarea = document.querySelector("[data-notes-input]") as HTMLTextAreaElement;
    textarea.value = "Hello World";
    textarea.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.dialogRef.componentInstance.noteFormControl.value).toBe("Hello World");
  });

  it("should assign the correct number of instances and parse the value", async () => {
    let instanceCount = document.querySelector(".instance-count-input [type='number']") as HTMLInputElement;
    expect(instanceCount.value).toBe(component.dialogRef.componentInstance.instanceCountFormControl.value as string);
    instanceCount.value = "1234";
    instanceCount.dispatchEvent(new Event("input"));
    await domUpdate(fixture);
    expect(component.dialogRef.componentInstance.instanceCountFormControl.value as any).toEqual(1234);
  });

  it("should submit the form", () => {
    let submitButton = document.querySelector("button[type=\"submit\"]") as HTMLButtonElement;
    let spy = spyOn(component.dialogRef.componentInstance, "onSubmit").and.returnValue();
    submitButton.click();
    expect(spy).toHaveBeenCalled();
  });
});

@Component({
  selector: "wrapper-component",
  template: "<p>Hello world</p>"
})
export class DialogWrapperComponent {
  public dialogRef!: MatDialogRef<InstanceConfigurationComponent, any>;

  constructor(public dialog: MatDialog) {
  }

  openDialog(instance: InstanceComparison) {
    return new Promise((resolve) => {
      let instanceConfigurationComponentDialogData: InstanceConfigurationComponentDialogData = {
        cart: createCartItemFromInstance(instance)
      };
      this.dialogRef = this.dialog.open(InstanceConfigurationComponent, {
        data: instanceConfigurationComponentDialogData,
        enterAnimationDuration: 0,
        exitAnimationDuration: 0
      });
      this.dialogRef.afterOpened().subscribe(resolve);
    });

  }
}

