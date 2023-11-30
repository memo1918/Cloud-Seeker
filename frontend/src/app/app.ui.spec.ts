import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app.module";
import { AppComponent } from "./app.component";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata";

async function delay(timeoutms: number) {
  return new Promise<any>((resolve) => setTimeout(resolve, timeoutms));
}

describe("UI-Tests", () => {
  let application: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let interval: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(AppComponent);
    application = fixture.componentInstance;
    fixture.autoDetectChanges(true);
    interval = setInterval(() => fixture.detectChanges(), 1);
  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
    clearInterval(interval);
  });

  it("should create", async () => {
    expect(application).toBeTruthy();
  });

  it("should open the dropdown", async () => {
    await delay(500);
    let dropdown = document.querySelector("#mat-select-8 > div") as HTMLElement;
    debugger;

    dropdown.click();
    fixture.detectChanges();
    debugger;
  });

});
