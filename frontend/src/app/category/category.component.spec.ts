import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryComponent } from "./category.component";
import { getTestBedDeclarations, getTestBedImports, getTestBedProviders } from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";

// this is the test module for the category component
describe('CategoryComponent', () => {
  // the component instance
  let component: CategoryComponent;
  // the angular fixture used for detecting changes
  let fixture: ComponentFixture<CategoryComponent>;
  // before each test
  // create a new instance of the category component that mocks our backend
  // set the spy on the fetch mock spec
  // set the response data to the dummy application data
  // configure the test bed
  // create the fixture
  // create the component instance
  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      ...getTestBedProviders()
    });
    localStorage.clear();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
  });
  // test if the component is created and does not throw an error
  it('category component should create', () => {
    expect(component).toBeTruthy();
  });
  // test if the component has the correct title
  it(`should have as title 'categoryComponent'`, async () => {
    await domUpdate(fixture);
    expect(component.title).toEqual('categoryComponent');
  });
  // test if the component has the correct data as categories
  it('should have correct data as categories', async () => {
    await domUpdate(fixture);
    await domUpdate(fixture);
    // wait 200ms for the categories to be loaded asynchronously
    // we wait for the categories to be loaded asynchronously and then check if the categories are correct
    // this is done by checking if the class exists in the dom
    await elementToBePresent(".test-cat", fixture);
    // get the categories from the component
    let selection = document.querySelectorAll("div.test-cat") as NodeListOf<HTMLElement>;
    // check if the second category is correct
    expect(selection[1].innerText).toEqual("Storage");
  })

  // test if the component changes the category on click
  it('should change category on click', async () => {
    // we wait for the categories to be loaded asynchronously and then check if the categories are correct
    await domUpdate(fixture);
    // save the html of the category component in a variable in order to compare it later
    let previous = await elementToBePresent("mat-tab-group", fixture) as HTMLElement;
    let prevHTML = previous.outerHTML;
    // get the categories from the component
    let selection = document.querySelectorAll("div.test-cat") as NodeListOf<HTMLElement>;
    let currentCategory = component.categoryService.getCategoryValue()?.name;
    // expect the current category to be compute
    expect(currentCategory).toEqual("Compute");
    // click on the second category
    selection[1].click();
    // wait for the dom to update
    await domUpdate(fixture);
    await fixture.whenStable();
    // save the html of the category component in a variable in order to compare it
    let next = await elementToBePresent("mat-tab-group", fixture) as HTMLElement;
    let nextHTML = next.outerHTML;
    // expect the html to be different
    expect(prevHTML).not.toEqual(nextHTML);
    // expect the current category to be storage
    currentCategory = component.categoryService.getCategoryValue()?.name;
    expect(currentCategory).toEqual("Storage")
  }, 10000);

});
