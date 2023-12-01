import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PreviewPanelComponent } from "./preview-panel.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app.module";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata";
import { AppComponent } from "../app.component";
import { domUpdate, elementToBePresent } from "../spec.helper";
import { padEnd } from "lodash";

describe('PreviewpanelComponent', () => {
  let component: PreviewPanelComponent;
  let fixture: ComponentFixture<PreviewPanelComponent>;
  let interval: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(PreviewPanelComponent);
    component = fixture.componentInstance;
    interval = setInterval(() => fixture.detectChanges(), 2);
  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
    clearInterval(interval);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("panel show test", async () => {
    await domUpdate(fixture);
    expect(component.showPanel).toBeFalsy()
    component.showPanel = true;
    await domUpdate(fixture);
    expect(component.showPanel).toBeTruthy()

    let panel = document.querySelector("[data-preview-panel]") as HTMLElement;
    expect(panel).toBeTruthy()

  });

  it("close button test", async () => {
    await domUpdate(fixture);

    component.showPanel = true;
    await domUpdate(fixture);
    expect(component.showPanel).toBeTruthy()

    let closeButton = document.querySelector("[data-panel-close]") as HTMLElement;
    expect(closeButton).toBeTruthy()
    closeButton.click()

    await domUpdate(fixture);
    let panel = document.querySelector("[data-preview-panel]") as HTMLElement;
    expect(panel).toBeFalsy();
  });

});
