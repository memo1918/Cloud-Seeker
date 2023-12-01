import {TestBed} from "@angular/core/testing";
import {CategoryService} from "./category.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {getTestBedDeclarations, getTestBedImports} from "../testbed.app.module";
import {FetchMockSpec} from "../fetch.mock.spec";
import {dummyApplicationData} from "../mocks/fetch/applicationdummydata";

describe('CategoryService', () => {
  let service: CategoryService;

  // class APIServiceMock extends APIService {
  //     constructor() {
  //         super();
  //     }
  //
  //   override async loadCounter(): Promise<void> {
  //     return Promise.resolve();
  //   }
  //
  //   override async loadCategories(): Promise<void> {
  //     this.categories =
  //     return Promise.resolve();
  //   }
  //
  //   override async loadInstances(categoryName: string): Promise<InstanceComparison[] | any[]> {
  //     return Promise.resolve([]);
  //   }
  //
  // }

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
      // declarations: [CategoryService],
      // providers: [
      //     {provide: APIService, useClass: APIServiceMock}
      // ]
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    service = TestBed.inject(CategoryService);
    spyOn(service, 'setCategory');
  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
    // clearInterval(interval);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should initialize selectedIndex", () => {
    expect(service.selectedIndex).toBeDefined();
  });

  it("should set selected category on tab change", () => {
    const tabChangeEvent: MatTabChangeEvent = {index: 1} as MatTabChangeEvent;

    service.onTabChange(tabChangeEvent);

    expect(service.selectedIndex).toEqual(1);
    expect(service.setCategory).toHaveBeenCalled();
  });
});
