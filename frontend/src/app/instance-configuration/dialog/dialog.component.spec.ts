import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogComponent } from "./dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { INSTANCE_COMPARISON_FIXTURE } from "../../fixtures/instance-comparison.fixture";
import { InstanceConfigurationComponent } from "../instance-configuration.component";
import { Component, ViewChild } from "@angular/core";
import { getTestBedImports } from "../../testbed.app";
import { FetchMockSpec } from "../../fetch.mock.spec";
import { dummyApplicationData } from "../../mocks/fetch/applicationdummydata.spec";

describe("DialogComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      declarations: [
        DialogComponent,
        InstanceConfigurationComponent,
        TestComponentWrapper
      ],
      ...getTestBedImports(),
      providers: [
        MatDialog
      ]
    });
    localStorage.clear();
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("button should open the dialog", () => {
    let button = document.querySelector("[data-open-dialog-button]") as HTMLButtonElement;
    let spy = spyOn(component.appUnitDropdownComponent, "openDialog");
    button.click();
    expect(spy).toHaveBeenCalled();
  });
  it("should pass the correct data to the dialog", async () => {
    let dialogRef = await component.appUnitDropdownComponent.openDialog();
    expect(dialogRef.componentInstance.data.cart.instance).toEqual(INSTANCE_COMPARISON_FIXTURE);
  });
});

@Component({
  selector: "test-component-wrapper",
  template: "<app-instance-configuration-dialog #appInstanceConfigurationDialog [instance]='INSTANCE_COMPARISON_FIXTURE'></app-instance-configuration-dialog>"
})
class TestComponentWrapper {
  @ViewChild("appInstanceConfigurationDialog") appUnitDropdownComponent!: DialogComponent;
  protected readonly INSTANCE_COMPARISON_FIXTURE = INSTANCE_COMPARISON_FIXTURE;
}
