import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CategoryComponent} from "./category.component";
import {getTestBedDeclarations, getTestBedImports} from "../testbed.app.module";
import {FetchMockSpec} from "../fetch.mock.spec";
import {dummyApplicationData} from "../mocks/fetch/applicationdummydata";
import {domUpdate, elementToBePresent} from "../spec.helper";

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let interval: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    interval = setInterval(() => fixture.detectChanges(), 2);
  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
    clearInterval(interval);
  });

  it('category component should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'categoryComponent'`, async () => {
    await domUpdate(fixture);
    expect(component.title).toEqual('categoryComponent');
  });

  // it('should change category on click', async () => {
  //   await domUpdate(fixture);
  //   debugger
  //   let selection = await elementToBePresent('#root23 > div > mat-tab-group > mat-tab-header > div > div', fixture);
  //   // let category=  selection.querySelector() as HTMLElement;
  //
  //   // let categorys = document.querySelectorAll("mat-tab") as NodeListOf<HTMLSpanElement>;
  //   debugger
  //   // categorys.click();
  //
  //   await domUpdate(fixture);
  //   debugger
  // });

});
