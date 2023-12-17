import {TestBed} from "@angular/core/testing";

import {StorageService} from "./storage.service";
import {FetchMockSpec} from "./fetch.mock.spec";
import {dummyApplicationData} from "./mocks/fetch/applicationdummydata.spec";
import {ShoppingCartDummyItemsFixture, StorageShoppingCartFixture} from "./fixtures/shopping-cart-dummy-items-fixture";
import {getTestBedDeclarations, getTestBedImports, getTestBedProviders} from "./testbed.app";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();
    service = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should save the shopping cart items", async () => {
    service.setCartItems(ShoppingCartDummyItemsFixture);
    expect(service.getCartItems()).toEqual(StorageShoppingCartFixture);
  });

  it("should return an empty array if no items are set", async () => {
    expect(service.getCartItems()).toEqual([]);
  });

  it("should update on storage event", async () => {
    localStorage.setItem("SHOPPING_CART_CONFIGURATION", JSON.stringify(StorageShoppingCartFixture));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "SHOPPING_CART_CONFIGURATION",
      newValue: JSON.stringify(StorageShoppingCartFixture)
    }));
    await new Promise(resolve => setTimeout(resolve, 200)); // wait for the promise queue to finish
    expect(service.getCartItems()).toEqual(StorageShoppingCartFixture);
  });

  it("should notify on a storage envent", async () => {
    let spy = spyOn(service.shoppingCart, "emit");
    localStorage.setItem("SHOPPING_CART_CONFIGURATION", JSON.stringify(StorageShoppingCartFixture));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "SHOPPING_CART_CONFIGURATION",
      newValue: JSON.stringify(StorageShoppingCartFixture)
    }));
    await new Promise(resolve => setTimeout(resolve, 200)); // wait for the promise queue to finish
    expect(spy).toHaveBeenCalled();
  });
});
