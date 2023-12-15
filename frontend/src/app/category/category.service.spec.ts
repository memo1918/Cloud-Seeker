import { TestBed } from "@angular/core/testing";
import { CategoryService } from "./category.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";

describe("CategoryService", () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();
    service = TestBed.inject(CategoryService);
    spyOn(service, "setCategory");
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialize selectedIndex", () => {
    // expect(service.selectedIndex).toBeDefined();
  });

  it("should set selected category on tab change", () => {
    const tabChangeEvent: MatTabChangeEvent = { index: 1 } as MatTabChangeEvent;

    // service.onTabChange(tabChangeEvent);

    // expect(service.selectedIndex).toEqual(1);
    // expect(service.setCategory).toHaveBeenCalled();
    // expect(service.getCategory).toEqual(service.getCategories()[1]);
  });
});
