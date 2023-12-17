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
      ...getTestBedImports(),
      ...getTestBedDeclarations(),
      ...getTestBedProviders()
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({});
    localStorage.clear();
    service = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get an empty array of cart items", () => {
    expect(service.shoppingCart.getValue()).toEqual([]);
  });

  it("should set new shopping cart items", async () => {
    service.setCartItems(ShoppingCartDummyItemsFixture);
    expect(service.shoppingCart.value).toEqual(StorageShoppingCartFixture);
    expect(localStorage.getItem("SHOPPING_CART_CONFIGURATION")).toEqual(JSON.stringify(StorageShoppingCartFixture));
  });

  it("should parse the items when a storage event is triggered", async () => {
   localStorage.setItem("SHOPPING_CART_CONFIGURATION", JSON.stringify(StorageShoppingCartFixture));
   window.dispatchEvent(new StorageEvent("storage", {
     key: "SHOPPING_CART_CONFIGURATION",
     newValue: JSON.stringify(StorageShoppingCartFixture)
   }));
    expect(service.shoppingCart.value).toEqual(StorageShoppingCartFixture);
  })
});
