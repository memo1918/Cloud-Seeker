import { TestBed } from "@angular/core/testing";

import { ShoppingCartService } from "./shopping-cart.service";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata.spec";

describe("ShoppingCartService", () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    localStorage.clear();
    service = TestBed.inject(ShoppingCartService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
