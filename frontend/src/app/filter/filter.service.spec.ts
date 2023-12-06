import { TestBed } from "@angular/core/testing";

import { FilterService } from "./filter.service";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { CategoryService } from "../category/category.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Category } from "../category/models/Category";
import { MatTabChangeEvent } from "@angular/material/tabs";

const fields_mock = [{
  "name": "cores",
  "options": ["1", "12", "128", "16", "192", "2", "32", "4", "48", "8"],
  "unit": "Cores",
  "type": "number"
}, {
  "name": "regionCode",
  "options": ["ap-northeast-3", "eu-central-2", "eu-south-1", "eu-west-3", "us-east-1", "us-east-1-nyc-1", "us-east-2", "us-gov-east-1", "us-gov-west-1", "us-west-2", "us-west-2-den-1"],
  "unit": "",
  "type": "dropdown"
}, { "name": "gpuMemory", "options": ["NA"], "unit": "", "type": "dropdown" }, {
  "name": "clockSpeed",
  "options": ["2.3 GHz", "2.4 GHz", "2.5 GHz", "2.95 GHz", "3 GHz", "3.1 GHz", "3.5 GHz", "4 GHz"],
  "unit": "",
  "type": "number"
}, {
  "name": "operatingSystem",
  "options": ["Linux", "RHEL", "Red Hat Enterprise Linux with HA", "Ubuntu Pro", "Windows"],
  "unit": "",
  "type": "dropdown"
}, {
  "name": "memory",
  "options": ["128 GiB", "15.25 GiB", "16 GiB", "192 GiB", "2048 GiB", "256 GiB", "30 GiB", "30.5 GiB", "32 GiB", "384 GiB", "4 GiB", "61 GiB", "64 GiB", "8 GiB", "96 GiB"],
  "unit": "",
  "type": "number"
}, {
  "name": "storage",
  "options": ["1 x 150 NVMe SSD", "1 x 1900 SSD", "1 x 237 NVMe SSD", "1 x 300 NVMe SSD", "1 x 450 NVMe SSD", "1 x 59 SSD", "2 x 1900 NVMe SSD", "2 x 80 SSD", "2 x 900 NVMe SSD", "6 x 2000 HDD", "EBS only"],
  "unit": "",
  "type": "dropdown"
}];

describe("FilterService", () => {
  let service: FilterService;

  class MockCategoryService {
    public static instance: MockCategoryService;

    constructor() {
      MockCategoryService.instance = this;
    }

    protected selectedCategory$: BehaviorSubject<Category | null> = new BehaviorSubject<Category | null>(null);

    getCategories(): Category[] {
      return [];
    }

    getCategory(): Observable<Category | null> {
      return this.selectedCategory$.asObservable();
    }

    getCategoryValue(): Category | null {
      return this.selectedCategory$.getValue();
    }

    onTabChange(tabChangeEvent: MatTabChangeEvent): void {

    }

    setCategory(selectedCategory: Category): void {
      this.selectedCategory$.next(selectedCategory);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      providers: [
        { provide: CategoryService, useClass: MockCategoryService }
      ]
    });
    service = TestBed.inject(FilterService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set the filter if assigned", () => {
    expect(service.getFilterValue()).toEqual([]);
    let filters = [{ filter: (element: any) => true, name: "name1", optionText: "this is filter text" }];
    service.setFilter(filters);
    expect(service.getFilterValue()).toEqual(filters);
  });

  it("should reset the filters if the category changes", async () => {
    expect(service.getFilterValue()).toEqual([]);

    let filters = [{ filter: (element: any) => true, name: "name1", optionText: "this is filter text" }];
    service.setFilter(filters);
    MockCategoryService.instance.setCategory({ description: "desc", fields: fields_mock, icon: "icon", name: "name" });
    expect(service.getFilterValue().length).toEqual(0);
  });

  it("should update available filters if the category changes", () => {
    expect(service.getFilterValue()).toEqual([]);
    // let filters = [{ filter: (element: any) => true, name: "name1", optionText: "this is filter text" }];
    // service.setFilter(filters);
    MockCategoryService.instance.setCategory({ description: "desc", fields: fields_mock, icon: "icon", name: "name" });
    expect(service.currentCategoryFields).toEqual(fields_mock);
  });

  it("should display only the correct instances", () => {
    let filtersPositiv = [
      { filter: (element: any) => true, name: "name1", optionText: "this is filter text" },
      { filter: (element: any) => true, name: "name1", optionText: "this is filter text" },
      { filter: (element: any) => true, name: "name1", optionText: "this is filter text" }
    ];
    service.setFilter(filtersPositiv);
    expect(service.shouldDisplay({} as any)).toBeTruthy();
    let filtersNegaitve = [
      { filter: (element: any) => true, name: "name1", optionText: "this is filter text" },
      { filter: (element: any) => false, name: "name1", optionText: "this is filter text" },
      { filter: (element: any) => true, name: "name1", optionText: "this is filter text" }
    ];
    service.setFilter(filtersNegaitve);
    expect(service.shouldDisplay({} as any)).toBeFalsy();
  });

  it("should call the filter functions", () => {
    let calledWith: any;
    let filters = [{
      filter: (element: any) => {
        calledWith = element;
        return true;
      }, name: "name1", optionText: "this is filter text"
    }];
    service.setFilter(filters);
    expect(calledWith).not.toBeDefined();
    let dummyinstance = { name: "myname" } as any;
    expect(service.shouldDisplay(dummyinstance)).toBeTruthy();
    expect(calledWith).toBe(dummyinstance);
  });

});
