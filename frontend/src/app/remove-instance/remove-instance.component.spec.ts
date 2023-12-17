import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RemoveInstanceComponent} from "./remove-instance.component";
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCartDummyService} from "../comparison/shopping-cart-dummy-service";
import {Component, ViewChild} from "@angular/core";
import {CartItem} from "../models/cart-item";
import {getTestBedDeclarations, getTestBedImports, getTestBedProviders} from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";

describe('RemoveInstanceComponent', () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations([], [TestComponentWrapper]),
      ...getTestBedProviders({provide: ShoppingCartService, useClass: ShoppingCartDummyService}),
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should remove items from the shopping cart', () => {
    component.cartItem = ShoppingCartDummyService.Instance.getItems()[0]
    fixture.detectChanges()
    expect(ShoppingCartDummyService.Instance.getItems()).toContain(component.cartItem)
    component.component.remove()
    expect(ShoppingCartDummyService.Instance.getItems()).not.toContain(component.cartItem)
  });
});

@Component({
  selector: "test-component-wrapper",
  template: `
    <app-remove-instance #instance [cartItem]="cartItem"></app-remove-instance>`
})
class TestComponentWrapper {
  cartItem!: CartItem
  @ViewChild("instance") component!: RemoveInstanceComponent;
}
