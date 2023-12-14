import {ComponentFixture, TestBed} from "@angular/core/testing";

import {RemoveInstanceComponent} from "./remove-instance.component";
import {getTestBedDeclarations, getTestBedImports} from "../testbed.app";
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCartDummyService} from "../comparison/shopping-cart-dummy-service";
import {Component, ViewChild} from "@angular/core";
import {Field} from "../filter/models/Field";
import {NumberRegulatorComponent} from "../filter/number-regulator/number-regulator.component";
import {CartItem} from "../models/cart-item";

describe('RemoveInstanceComponent', () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations([], [TestComponentWrapper]),
      providers: [
        {provide: ShoppingCartService, useClass: ShoppingCartDummyService}
      ],
    });
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
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
