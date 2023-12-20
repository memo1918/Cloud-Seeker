import { TestBed } from "@angular/core/testing";
import { CategoryService } from "./category.service";
import { getTestBedDeclarations, getTestBedImports, getTestBedProviders } from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";

// this is the test module for the category service
describe("CategoryService", () => {
  // the category service instance
  let service: CategoryService;
  // before each test
  // configure the test bed
  // add the spy on the fetch mock spec used for mocking the backend
  // set the response data to the dummy application data
  // create the category service instance
  // spy on the set category function
  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      ...getTestBedProviders()
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();
    service = TestBed.inject(CategoryService);
    spyOn(service, "setCategory");
  });
  // test if the category service is created and does not throw an error
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
