import { TestBed } from "@angular/core/testing";

import { RoutingService } from "./routing.service";
import {getTestBedDeclarations, getTestBedImports, getTestBedProviders} from "./testbed.app";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata.spec";

describe("RoutingService", () => {
  let service: RoutingService;

  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      ...getTestBedProviders()
    });
    localStorage.clear();
    service = TestBed.inject(RoutingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
