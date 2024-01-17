import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstancePreviewComponent } from "./instance-preview.component";
import { getTestBedDeclarations, getTestBedImports, getTestBedProviders } from "../testbed.app";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { FetchMockSpec } from "../fetch.mock.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";
import * as _ from "lodash";


describe("InstancePreviewComponent", () => {
  let component: InstancePreviewComponent;
  let fixture: ComponentFixture<InstancePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      ...getTestBedProviders()
    });
    localStorage.clear();
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(InstancePreviewComponent);
    component = fixture.componentInstance;
  });

  /**
   * This test checks if the instance preview component is created.
   */
  it("should create", () => {
    expect(component).toBeTruthy();
  });

  /**
   * This test checks if the instance preview is initialized with loaded instances.
   */
  it("should initialize with loaded instances", async () => {
    await domUpdate(fixture);
    let preview = await elementToBePresent("div.instance-preview-container", fixture) as HTMLElement;
    expect(preview).toBeTruthy();
  });

  /**
   * This test checks if the instance name is displayed correctly.
   */
  it("should display the correct instance name", async () => {
    await domUpdate(fixture);
    let titles = document.querySelectorAll(".instanceName") as NodeListOf<HTMLElement>;
    for (let i = 0; i < component.getItems().length; i++) {
      let item = component.getItems()[i];
      expect(titles[i].textContent).toEqual(_.valuesIn(item.name).join(" / "));
    }
  });

  /**
   * This test checks if the correct fields & the correct number of fields are displayed for each category.
   */
  it("should display the correct fields & number of fields for each category", async () => {
    await domUpdate(fixture);
    const expectedFields = ["cores", "regionCode", "gpuMemory", "clockSpeed", "operatingSystem", "memory", "storage"];
    let fieldRows = document.querySelectorAll(".fieldRow") as NodeListOf<HTMLElement>;
    for (let i = 0; i < component.getItems().length; i++) {
      const instanceRow = fieldRows[i];
      const fields = instanceRow.querySelectorAll(".fieldNameData") as NodeListOf<HTMLElement>;
      for (let j = 0; j < fields.length; j++) {
        const fieldName = fields[j].textContent?.trim();
        expect(fieldName).toEqual(expectedFields[j]);
      }
      expect(fields.length).toEqual(expectedFields.length);
    }
  });

  /**
   * This test checks for 0 if there is no category selected.
   */
  it("test for no selected category", async () => {
    expect(component.getCategoryLength()).toEqual(0);
  });
});
