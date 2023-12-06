import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TagsComponent } from "./tags.component";
import { getTestBedDeclarations, getTestBedImports } from "../../testbed.app";
import { FetchMockSpec } from "../../fetch.mock.spec";
import { dummyApplicationData } from "../../mocks/fetch/applicationdummydata.spec";
import { domUpdate, elementToBePresent } from "../../helper.spec";

describe("TagsComponent", () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedDeclarations(),
      ...getTestBedImports()
    });
    fixture = TestBed.createComponent(TagsComponent);

    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);

    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render all selected filters", async () => {
    let root = await elementToBePresent(".tagHost", fixture);
    let matChips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(0);


    let optionText = "my special filter text";
    let filterFixture = [{ filter: (i: any) => true, name: "my special name", optionText }];
    component.filterService.setFilter(filterFixture);
    await domUpdate(fixture);
    matChips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(1);

    let filterSpan = document.querySelector("span.filterTagText") as HTMLSpanElement;
    expect(filterSpan).toBeDefined();
    expect(filterSpan.innerText).toEqual(optionText);
  });

  it("should remove a filter correctly", async () => {
    let root = await elementToBePresent(".tagHost", fixture);
    let matChips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(0);


    let optionText = "my special filter text";
    let filterFixture = [{ filter: (i: any) => true, name: "my special name", optionText }];
    component.filterService.setFilter(filterFixture);
    await domUpdate(fixture);
    matChips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>;
    expect(matChips.length).toEqual(1);

    let removeButton = document.querySelector("mat-chip button") as HTMLButtonElement;
    expect(removeButton).toBeDefined();

    removeButton.click();
    await domUpdate(fixture);

    expect(component.filterService.getFilterValue().length).toEqual(0);
  });
});
