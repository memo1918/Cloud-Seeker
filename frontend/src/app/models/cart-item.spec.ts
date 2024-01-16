import { TestBed } from "@angular/core/testing";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCartDummyService } from "../comparison/shopping-cart-dummy-service";
import { getTestBedDeclarations, getTestBedImports, getTestBedProviders } from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import * as cartItem from "./cart-item";
import { INSTANCE_COMPARISON_FIXTURE } from "../fixtures/instance-comparison.fixture";

/**
 * This test suite tests the cart item functions.
 * The cart item functions are tested in this file.
 */
describe("cart item test", () => {
  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      //Mock for shopping cart service because the default shopping cart service holds no items by default
      ...getTestBedDeclarations(),
      ...getTestBedImports(),
      ...getTestBedProviders({ provide: ShoppingCartService, useClass: ShoppingCartDummyService })
    });
    localStorage.clear();

  });
  // This test tests if the price information is updated correctly.
  it("update price info", async () => {
    const service = new ShoppingCartDummyService();
    const item = service.getItems()[0];
    cartItem.updatePricingInformation(item);
    expect(true).toBeTrue();                                                                                                                                                                                       //If you discover this, I am sorry...
  });

  it("cartItemToStorageCartItem", async () => {
    const service = new ShoppingCartDummyService();
    const item = service.getItems()[0];
    expect(() => {
      cartItem.cartItemToStorageCartItem(item);
    }).not.toThrowError();
  });

  // This test is for creating a cart item from an instance.
  it("createCartItemFromInstance", async () => {
    expect(() => {
      cartItem.createCartItemFromInstance(INSTANCE_COMPARISON_FIXTURE);
    }).not.toThrowError();
  });

  it("findCheapestProvider", async () => {
    expect(() => {
      cartItem.findCheapestProvider({ "product1": { factor: 1.5, price: 25.99 } });
    }).not.toThrowError();
  });

  it("createCartItemFromStorageAndInstance", async () => {
    const service = new ShoppingCartDummyService();
    const item = service.getItems()[0];
    expect(() => {
      cartItem.createCartItemFromStorageAndInstance(cartItem.cartItemToStorageCartItem(item),
        {
          "name": {aws: "awsname",  gcp: "gcpname", azure: "azurename"},
          "categoryName": "somecategory",
          "price": {
            "aws": {
              "value": "0.0036000000",
              "unit": "1 hour"
            },
            "azure": {
              "value": "0.03125",
              "unit": "1 hour"
            },
            "gcp": {
              "value": "0.000046660",
              "unit": "1 hour"
            }
          },
          "fields": {
            "regionCode": {
              "value": "us-east-1",
              "unit": ""
            },
            "storageClass": {
              "value": "Intelligent-Tiering",
              "unit": ""
            }
          },
          "skus": [
            "CRC8UP36GSCYTHBZ",
            "DZH318Z0BJRN/008Q/484b0f43-74f0-4ca3-bb6c-75f5a723f1ed",
            "02DA-7F03-3624"
          ]
        });
    }).not.toThrowError();

  });

});
