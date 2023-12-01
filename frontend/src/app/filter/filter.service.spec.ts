import { TestBed } from "@angular/core/testing";

import { FilterService } from "./filter.service";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app.module";

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
