import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryComponent } from "./category.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let interval: any;

  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
    });
    localStorage.clear();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    // interval = setInterval(() => fixture.detectChanges(), 2);
  });

  afterEach(() => {
    // FetchMockSpec.getInstance().resetResponseData();
    // clearInterval(interval);
  });

  it('category component should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'categoryComponent'`, async () => {
    await domUpdate(fixture);
    expect(component.title).toEqual('categoryComponent');
  });

  it('should have correct data as categories', async () => {
    await domUpdate(fixture);
    await domUpdate(fixture);
    // debugger;
    await elementToBePresent(".test-cat", fixture);
    // debugger;
    let selection = document.querySelectorAll("div.test-cat") as NodeListOf<HTMLElement>;
    expect(selection[1].innerText).toEqual("Storage");
  })

  it('should change category on click', async () => {
    await domUpdate(fixture);
    let previous = await elementToBePresent("mat-tab-group", fixture) as HTMLElement;
    let prevHTML = previous.outerHTML;
    let selection = document.querySelectorAll("div.test-cat") as NodeListOf<HTMLElement>;
    let currentCategory = component.categoryService.getCategoryValue()?.name;
    expect(currentCategory).toEqual("Compute");
    selection[1].click();
    await domUpdate(fixture);
    await fixture.whenStable();
    let next = await elementToBePresent("mat-tab-group", fixture) as HTMLElement;
    let nextHTML = next.outerHTML;
    currentCategory = component.categoryService.getCategoryValue()?.name;
    expect(prevHTML).not.toEqual(nextHTML);
    expect(currentCategory).toEqual("Storage")
  }, 10000);

});
