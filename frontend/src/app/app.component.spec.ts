import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata.spec";

describe("AppComponent", () => {
  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    localStorage.clear();
    TestBed.compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("frontend");
  });
})
;
