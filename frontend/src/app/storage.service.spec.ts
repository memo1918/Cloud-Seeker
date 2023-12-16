import { TestBed } from "@angular/core/testing";

import { StorageService } from "./storage.service";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata.spec";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({});
    localStorage.clear();
    service = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
