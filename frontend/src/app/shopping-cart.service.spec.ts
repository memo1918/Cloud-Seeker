import {TestBed} from "@angular/core/testing";

import {ShoppingCartService} from "./shopping-cart.service";
import {getTestBedProviders} from "./testbed.app";
import {ShoppingCartDummyItemsFixture, StorageShoppingCartFixture} from "./fixtures/shopping-cart-dummy-items-fixture";

describe("ShoppingCartService", () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedProviders()
    });
    localStorage.clear();
  });

  it("should be created", () => {
    service = TestBed.inject(ShoppingCartService);
    expect(service).toBeTruthy();
  });

  it("should get an empty array of cart items", () => {
    service = TestBed.inject(ShoppingCartService);
    expect(service.getItems()).toEqual([]);
  });

  it("should set new shopping cart items", async () => {
    service = TestBed.inject(ShoppingCartService);
    service.setItems(ShoppingCartDummyItemsFixture);
    expect(service.getItems()).toEqual(ShoppingCartDummyItemsFixture);
  });

  it("should parse the items when the storage changes", async () => {
    service = TestBed.inject(ShoppingCartService);
    service.storage.shoppingCart.next(StorageShoppingCartFixture);
    await new Promise(resolve => setTimeout(resolve, 200)); // wait for the promise queue to finish

    const cartItems = service.getItems();
    const storageItems = service.storage.getCartItems();
    cartItems.forEach((item, index) => {
      expect(item.instance.skus).toEqual(storageItems[index].skus);
    })
  })

  it("should update the items when a storage event is fired", async () => {
    service = TestBed.inject(ShoppingCartService);

    localStorage.setItem("SHOPPING_CART_CONFIGURATION", JSON.stringify(StorageShoppingCartFixture));

    window.dispatchEvent(new StorageEvent("storage", {
      key: "SHOPPING_CART_CONFIGURATION",
      newValue: JSON.stringify(ShoppingCartDummyItemsFixture)
    }));

    await new Promise(resolve => setTimeout(resolve, 200)); // wait for the promise queue to finish

    const cartItems = service.getItems();
    const storageItems = service.storage.getCartItems();

    cartItems.forEach((item, index) => {
      expect(item.instance.skus).toEqual(storageItems[index].skus);
    })
  });
});
