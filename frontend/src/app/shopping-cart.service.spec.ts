import { TestBed } from "@angular/core/testing";

import { ShoppingCartService } from "./shopping-cart.service";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app";

describe("ShoppingCartService", () => {
  let service: ShoppingCartService;

  beforeEach(() => {
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
