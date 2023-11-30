import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app.module";
import { AppComponent } from "./app.component";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata";

describe("UI-Tests", () => {
  let application: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(AppComponent);
    application = fixture.componentInstance;

  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
  });

  it("should create", async () => {
    expect(application).toBeTruthy();
  });

});
