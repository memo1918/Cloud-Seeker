import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TagsComponent } from "./tags.component";
import {getTestBedDeclarations, getTestBedImports, getTestBedProviders} from "../../testbed.app";
import { FetchMockSpec } from "../../fetch.mock.spec";
import { dummyApplicationData } from "../../mocks/fetch/applicationdummydata.spec";
import { domUpdate } from "../../helper.spec";

describe("TagsComponent", () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedDeclarations(),
      ...getTestBedImports(),
      ...getTestBedProviders()
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();
    fixture = TestBed.createComponent(TagsComponent);

    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render all selected filters", async () => {
    await domUpdate(fixture);
    let matChips = document.querySelectorAll(".tagHost mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(0);


    let optionText = "my special filter text";
    let filterFixture = [{ filter: (i: any) => true, name: "my special name", optionText }];
    component.filterService.setFilter(filterFixture);
    await domUpdate(fixture);
    matChips = document.querySelectorAll(".tagHost mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(1);

    let filterSpan = document.querySelector("span.filterTagText") as HTMLSpanElement;
    expect(filterSpan).toBeDefined();
    expect(filterSpan.innerText).toEqual(optionText);
  });

  it("should remove a filter correctly", async () => {
    await domUpdate(fixture);
    let matChips = document.querySelectorAll(".tagHost mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(0);


    let optionText = "my special filter text";
    let filterFixture = [{ filter: (i: any) => true, name: "my special name", optionText }];
    component.filterService.setFilter(filterFixture);
    await domUpdate(fixture);
    matChips = document.querySelectorAll(".tagHost mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(1);

    let removeButton = document.querySelector("mat-chip button") as HTMLButtonElement;
    expect(removeButton).toBeDefined();

    removeButton.click();
    await domUpdate(fixture);

    expect(component.filterService.getFilterValue().length).toEqual(0);
  });
});
