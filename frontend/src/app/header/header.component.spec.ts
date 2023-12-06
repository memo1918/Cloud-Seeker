import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app.module";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { domUpdate } from "../helper.spec";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let interval: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(HeaderComponent);
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

  it("if badge exists", async () => {
    await domUpdate(fixture);
    let badgecontent = document.querySelector(".mat-badge-content.mat-badge-active") as HTMLElement;
    expect(badgecontent.innerText).toEqual("0")

  });

  it("button test to pen preview panel", async () => {
    await domUpdate(fixture);
    let button = document.querySelector("[data-panel-button]") as HTMLButtonElement;
    expect(component.service.toggle.getValue()).toBeFalsy()
    button.click();
    await domUpdate(fixture);
    expect(component.service.toggle.getValue()).toBeTruthy()

  });
});
