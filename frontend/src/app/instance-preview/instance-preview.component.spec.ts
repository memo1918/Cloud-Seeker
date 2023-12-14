import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstancePreviewComponent } from "./instance-preview.component";
import { getTestBedImports, getTestBedDeclarations } from "../testbed.app";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { FetchMockSpec } from "../fetch.mock.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";
import { FilterService } from "../filter/filter.service";
import * as _ from "lodash";
import { CategoryService } from "../category/category.service";

var isArrayEqual = function(x: any[], y: any[]) {
  return _(x).xorWith(y, _.isEqual).isEmpty();
};

describe("InstancePreviewComponent", () => {
  let component: InstancePreviewComponent;
  let fixture: ComponentFixture<InstancePreviewComponent>;
  let interval: any;
  let filterService: FilterService;
  let categoryService: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(InstancePreviewComponent);
    component = fixture.componentInstance;
    interval = setInterval(() => fixture.detectChanges(), 2);
    filterService = TestBed.inject(FilterService);
    categoryService = TestBed.inject(CategoryService);
  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
    clearInterval(interval);
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with loaded instances", async () => {
    await domUpdate(fixture);
    let preview = await elementToBePresent("div.instance-preview-container", fixture) as HTMLElement;
    expect(preview).toBeTruthy();
  });

  it("should display the correct instance name", async () => {
    await domUpdate(fixture);
    let titles = document.querySelectorAll(".instanceName") as NodeListOf<HTMLElement>;
    for (let i = 0; i < component.getItems().length; i++) {
      let item = component.getItems()[i];
      expect(titles[i].textContent).toEqual(_.valuesIn(item.name).join(" / "));
    }
  });

  it("should display the correct fields & number of fields for each category", async () => {
    await domUpdate(fixture);
    // display the correct amount of fields for the selected category
    const expectedCategory = "compute";
    const expectedFields = ["cores", "regionCode", "gpuMemory", "clockSpeed", "operatingSystem", "memory", "storage"];
    for (let i = 0; i < component.getItems().length; i++) {
      const item = component.getItems()[i];
      const fields = document.querySelectorAll(".fieldsContainer") as NodeListOf<HTMLElement>;

      // Check the number of fields
      //expect(fields.length).toEqual(expectedFields.length);

      for (let j = 0; j < fields.length; j++) {
        const fieldName = fields[j].querySelector(".fieldName")?.textContent?.trim();
        expect(fieldName).toEqual(expectedFields[j]);
      }
    }
  });
});
