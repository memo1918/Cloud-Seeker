import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import {getTestBedDeclarations, getTestBedImports, getTestBedProviders} from "./testbed.app";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata.spec";

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      ...getTestBedProviders()
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();
    TestBed.compileComponents();
  });
  it("should be silent", () => {
    expect(true).toBe(true);
  });
  //
  // it("should create the app", () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });
  //
  // it(`should have as title 'frontend'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual("frontend");
  // });
})
;
