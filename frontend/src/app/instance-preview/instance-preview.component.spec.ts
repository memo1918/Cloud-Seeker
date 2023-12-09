import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstancePreviewComponent } from "./instance-preview.component";
import { getTestBedImports, getTestBedDeclarations} from "../testbed.app";
import { dummyApplicationData} from "../mocks/fetch/applicationdummydata.spec";
import { FetchMockSpec } from "../fetch.mock.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";

describe("InstancePreviewComponent", () => {
  let component: InstancePreviewComponent;
  let fixture: ComponentFixture<InstancePreviewComponent>;
  let interval: any;

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
    debugger;
    // expect the preview to exist
    expect(preview).toBeTruthy();
  });

  it("should display correct instance name", async () => {

  });
});
