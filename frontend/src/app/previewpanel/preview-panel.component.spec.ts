import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PreviewPanelComponent } from "./preview-panel.component";
import {getTestBedDeclarations, getTestBedImports, getTestBedProviders} from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";
import { ShoppingCartDummyItemsFixture } from "../fixtures/shopping-cart-dummy-items-fixture";

describe('PreviewpanelComponent', () => {
  let component: PreviewPanelComponent;
  let fixture: ComponentFixture<PreviewPanelComponent>;
  let interval: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      ...getTestBedProviders()
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();
    fixture = TestBed.createComponent(PreviewPanelComponent);
    component = fixture.componentInstance;
    interval = setInterval(() => fixture.detectChanges(), 2);
  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
    clearInterval(interval);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("panel show test", async () => {
    await domUpdate(fixture);
    expect(component.showPanel).toBeFalse()

    component.showPanel = true;
    await domUpdate(fixture);

    let panel = document.querySelector("[data-preview-panel]") as HTMLElement;
    expect(panel).toBeTruthy()

  });

  it("close button test", async () => {
    await domUpdate(fixture);


    component.showPanel = true;
    await domUpdate(fixture);
    expect(component.showPanel).toBeTruthy()

    let closeButton = document.querySelector("[data-panel-close]") as HTMLButtonElement;
    expect(closeButton).toBeTruthy()
    closeButton.click()
    await domUpdate(fixture);
    let panel = document.querySelector(".main-panel") as HTMLElement;
    let op = panel.closest("[ng-reflect-opened]") as HTMLElement;

    expect(op.getAttribute("ng-reflect-opened")).toEqual("false");
  });


  it("check data shopping cart", async () => {
    fixture.detectChanges()
    component.shoppingCart.setItems(ShoppingCartDummyItemsFixture);
    component.showPanel = true;

    // await domUpdate(fixture)

    let categoryName = await elementToBePresent(".categoryName",fixture) as HTMLElement;
    expect(categoryName.innerText).toEqual("Compute")

    let itemName = document.querySelector(".itemName") as HTMLElement;
    expect(itemName.innerText).toEqual("Virtual Machines / AWSOutposts / Compute Engine")

  });

});
