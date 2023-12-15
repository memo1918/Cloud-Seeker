import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstancePreviewComponent } from "./instance-preview.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { FetchMockSpec } from "../fetch.mock.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";

describe("InstancePreviewComponent", () => {
  let component: InstancePreviewComponent;
  let fixture: ComponentFixture<InstancePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    localStorage.clear();
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(InstancePreviewComponent);
    component = fixture.componentInstance;
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with loaded instances", async () => {
    await domUpdate(fixture);
    let preview = await elementToBePresent("div.instance-preview-container", fixture) as HTMLElement;
    // expect the preview to exist
    expect(preview).toBeTruthy();
  });
});
