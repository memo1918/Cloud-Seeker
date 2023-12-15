import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastmessageComponent } from "./toastmessage.component";
import { domUpdate, elementToBePresent } from "../helper.spec";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { ShoppingCartDummyItemsFixture } from "../fixtures/shopping-cart-dummy-items-fixture";

describe("ToastmessageComponent", () => {
  let component: ToastmessageComponent;
  let fixture: ComponentFixture<ToastmessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    localStorage.clear();
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(ToastmessageComponent);
    component = fixture.componentInstance;

  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });


  it("toast message on added item", async () => {
    fixture.detectChanges();

    component.shoppingCart.setItems(ShoppingCartDummyItemsFixture);

    const snackingDiv = await elementToBePresent("mat-snack-bar-container", fixture) as HTMLElement;
    expect(snackingDiv.innerText).toEqual("Instance added\n" + "Close");
  });

  it("toast message on removed item", async () => {
    component.shoppingCart.setItems(ShoppingCartDummyItemsFixture);
    await domUpdate(fixture);

    component.shoppingCart.setItems([]);

    await domUpdate(fixture);

    const snackingDiv = await elementToBePresent("mat-snack-bar-container", fixture) as HTMLElement;
    expect(snackingDiv.innerText).toEqual("Instance removed\n" + "Close");
  });

});
