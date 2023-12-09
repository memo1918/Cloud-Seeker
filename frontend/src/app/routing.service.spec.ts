import { TestBed } from "@angular/core/testing";

import { RoutingService } from "./routing.service";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app";

describe("RoutingService", () => {
  let service: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    service = TestBed.inject(RoutingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
