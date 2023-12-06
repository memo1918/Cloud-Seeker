import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PreviewPanelComponent } from "./preview-panel.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app.module";
import { FetchMockSpec } from "../fetch.mock.spec";
import { CartItem } from "../models/cart-item";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";
import { domUpdate, elementToBePresent } from "../helper.spec";

const shoppingCartFixture =  [
  {
    "instance": {
      "_id": "65707900eda2c48b7eaf415f",
      "name": {
        "azure": "Virtual Machines",
        "aws": "AWSOutposts",
        "gcp": "Compute Engine"
      },
      "categoryName": "Compute",
      "price": {
        "azure": {
          "value": "0.51607",
          "unit": "1 Hour"
        },
        "aws": {
          "value": "1.4720000000",
          "unit": "Hrs"
        },
        "gcp": {
          "value": "0.076432",
          "unit": "Hours"
        }
      },
      "fields": {
        "cores": {
          "value": "32",
          "unit": ""
        },
        "memory": {
          "value": "256 GiB",
          "unit": ""
        },
        "regionCode": {
          "value": "us-east-2",
          "unit": ""
        },
        "operatingSystem": {
          "value": "Windows",
          "unit": ""
        },
        "storage": {
          "value": "EBS only",
          "unit": ""
        },
        "gpuMemory": {
          "value": "NA",
          "unit": ""
        },
        "clockSpeed": {
          "value": "NA",
          "unit": ""
        }
      },
      "skus": [
        "DZH318Z096SR/Standard_E64s_v5/39c020f9-4583-544b-9488-af34c670b3c1",
        "FW8E5RQ44WYXEWXN",
        "generated-n2-highcpu-8"
      ]
    },
    "pricingInformation": {
      "azure": {
        "factor": 1,
        "price": 0.51607
      },
      "aws": {
        "factor": 1,
        "price": 1.472
      },
      "gcp": {
        "factor": 1,
        "price": 0.076432
      }
    },
    "units": [
      {
        "providerName": "azure",
        "providerDefault": {
          "tokens": [
            "1",
            "Hour"
          ],
          "categories": [
            {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            },
            {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": [
                "millisecond",
                "second",
                "minute",
                "hour",
                "day",
                "week",
                "month",
                "year"
              ],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }
          ]
        },
        "configuration": {
          "tokens": [
            "1",
            "Hour"
          ],
          "categories": [
            {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            },
            {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": [
                "millisecond",
                "second",
                "minute",
                "hour",
                "day",
                "week",
                "month",
                "year"
              ],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }
          ]
        }
      },
      {
        "providerName": "aws",
        "providerDefault": {
          "tokens": [
            "Hrs"
          ],
          "categories": [
            {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            },
            {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": [
                "millisecond",
                "second",
                "minute",
                "hour",
                "day",
                "week",
                "month",
                "year"
              ],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }
          ]
        },
        "configuration": {
          "tokens": [
            "1",
            "Hour"
          ],
          "categories": [
            {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            },
            {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": [
                "millisecond",
                "second",
                "minute",
                "hour",
                "day",
                "week",
                "month",
                "year"
              ],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }
          ]
        }
      },
      {
        "providerName": "gcp",
        "providerDefault": {
          "tokens": [
            "Hours"
          ],
          "categories": [
            {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            },
            {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": [
                "millisecond",
                "second",
                "minute",
                "hour",
                "day",
                "week",
                "month",
                "year"
              ],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }
          ]
        },
        "configuration": {
          "tokens": [
            "1",
            "Hour"
          ],
          "categories": [
            {
              "token": "1",
              "unitName": "NumberUnitCategorisation",
              "value": 1,
              "type": "number",
              "options": null,
              "acceptsUserInput": true,
              "inputType": "input"
            },
            {
              "unitName": "TimeUnitCategorisation",
              "type": "number",
              "options": [
                "millisecond",
                "second",
                "minute",
                "hour",
                "day",
                "week",
                "month",
                "year"
              ],
              "acceptsUserInput": true,
              "inputType": "dropdown",
              "token": "hour",
              "milliseconds": 3600000,
              "selected": "hour"
            }
          ]
        }
      }
    ],
    "selectedProvider": "gcp",
    "notes": "",
    "numberOfInstances": 1
  }
] as any as CartItem[];

describe('PreviewpanelComponent', () => {
  let component: PreviewPanelComponent;
  let fixture: ComponentFixture<PreviewPanelComponent>;
  let interval: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

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
    let panel = document.querySelector("[data-preview-panel]") as HTMLElement;
    expect(panel).toBeFalsy();
  });


  it("check data shopping cart", async () => {
    fixture.detectChanges()
    component.shoppingCart .setItems(shoppingCartFixture)
    component.showPanel = true;

    // await domUpdate(fixture)

    let categoryName = await elementToBePresent(".categoryName",fixture) as HTMLElement;
    expect(categoryName.innerText).toEqual("Compute")
    debugger

    let itemName = document.querySelector(".itemName") as HTMLElement;
    expect(itemName.innerText).toEqual("Virtual Machines / AWSOutposts / Compute Engine")

  });

});
