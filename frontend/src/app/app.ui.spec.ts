import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app";
import { AppComponent } from "./app.component";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata.spec";
import { domUpdate, elementToBePresent } from "./helper.spec";
import { ShoppingCartService } from "./shopping-cart.service";

const ENABLE_DEBUGGER = false;

describe("UI-Tests", () => {
  let application: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    localStorage.clear();

    fixture = TestBed.createComponent(AppComponent);
    application = fixture.componentInstance;
  });

  afterEach(() => {
    // FetchMockSpec.getInstance().resetResponseData();
  });

  // it("should create", async () => {
  //   expect(application).toBeTruthy();
  // });

  it("should filter by region configure a instance and add a item to the shopping cart", async () => {

    await domUpdate(fixture);
    // await fixture.whenStable();

    if (ENABLE_DEBUGGER) debugger;
    console.log("selecting dropdown");
    let dropdown = await elementToBePresent(`[data-filter-name="regionCode"] mat-select`, fixture) as HTMLElement;

    // we expect the region code dropdown to exist
    expect(dropdown).toBeTruthy();
    // let's click on the region code dropdown
    dropdown.click();

    console.log("clicking on dropdown");

    await domUpdate(fixture);

    // we now expect the dropdown to be open and to contain our elements
    let items = document.querySelectorAll("mat-option>span") as NodeListOf<HTMLSpanElement>;
    console.log("slecting all dropdown elements");
    let options = ["None", "ap-northeast-3", "eu-central-2", "eu-south-1", "eu-west-3", "us-east-1", "us-east-1-nyc-1", "us-east-2", "us-gov-east-1", "us-gov-west-1", "us-west-2", "us-west-2-den-1"];

    expect(items.length).toBe(options.length);
    for (let i = 0; i < items.length; i++) {
      expect(items[i].innerText).toBe(options[i]);
    }

    // lets click on eu-south-1
    items[3].click();
    console.log("clicking on the third element");
    await domUpdate(fixture);

    if (ENABLE_DEBUGGER) debugger;

    console.log("selecting dropdown");
    // we expect the selection to update to one filter
    dropdown = await elementToBePresent(`[data-filter-name="regionCode"] mat-select`, fixture) as HTMLElement;
    expect(dropdown.innerText).toBe(options[3]);

    // we check the number of results
    console.log("selecting table");
    let table = await elementToBePresent("app-instance-preview > div > div > table", fixture);
    let titleRows = table.querySelectorAll(".titleRow") as NodeListOf<HTMLTableRowElement>;
    expect(titleRows.length).toBe(1);
    let fieldRows = table.querySelectorAll(".fieldRow") as NodeListOf<HTMLTableRowElement>;
    expect(fieldRows.length).toBe(1);
    let fieldCells = fieldRows[0].querySelectorAll("td") as NodeListOf<HTMLTableCellElement>;
    // we check the numer of filters
    expect(fieldCells.length).toBe(8);

    // we check if a button exists in the last cell to open the dialog
    console.log("selecting add button");
    let buttonCell = fieldCells[7];
    let button = buttonCell.querySelector("app-instance-configuration-dialog button") as HTMLButtonElement;
    // expect the add instance button to exist
    expect(button).toBeTruthy();

    // click the add instance button to open the dialog
    button.click();
    console.log("clicking on the add button and waiting for the dialog to open");
    let dialog = await elementToBePresent("app-instance-configuration", fixture);

    if (ENABLE_DEBUGGER) debugger;

    // expect the title to be identical to the title in the first row
    console.log("checking the header");
    let title = dialog.querySelector("h1");
    expect(title).toBeTruthy();
    expect(title!.innerText).toBe(titleRows[0].innerText);


    // expect being able to take notes
    let htmlTextAreaElement = dialog.querySelector("[data-notes-input]") as HTMLTextAreaElement;
    const noteForTesting = "this is my note for testing";
    htmlTextAreaElement.value = noteForTesting;
    htmlTextAreaElement.dispatchEvent(new Event("input"));

    // enter different number in the price configuration
    let unitInputField = dialog.querySelector("input[data-unit-number]") as HTMLInputElement;
    unitInputField.value = "8";
    unitInputField.dispatchEvent(new Event("input"));

    await domUpdate(fixture);
    // select default units
    // dropdownComponent.click();
    // debugger;
    if (ENABLE_DEBUGGER) debugger;

    let submitButton = dialog.querySelector(`button[type="submit"]`) as HTMLButtonElement;

    if (ENABLE_DEBUGGER) debugger;

    submitButton.click();
    await domUpdate(fixture);
    expect(document.querySelector("app-instance-configuration")).toBeFalsy();

    if (ENABLE_DEBUGGER) debugger;

    let shoppingCartService = window["ShoppingCartService" as any] as unknown as ShoppingCartService;
    // expect the instance to be added to the cart
    expect(shoppingCartService.getItems().length).toBe(1);

    let item = shoppingCartService.getItems()[0];
    expect(item.notes).toBe(noteForTesting);
    expect(item.selectedProvider).toBe("azure");
    let pricingInformation = item.pricingInformation;
    expect(pricingInformation["aws"].factor).toBe(8);
    expect(pricingInformation["aws"].price).toBeCloseTo(43.11272);
    expect(pricingInformation["gcp"].factor).toBe(8);
    expect(pricingInformation["gcp"].price).toBeCloseTo(2.696448);
    expect(pricingInformation["azure"].factor).toBe(8);
    expect(pricingInformation["azure"].price).toBeCloseTo(2.224);

    if (ENABLE_DEBUGGER) debugger;

  }, ENABLE_DEBUGGER ? 100000000 : undefined);

  it("should filter by cpu", async () => {
    await domUpdate(fixture);
    // await fixture.whenStable();

    // save previous html element count
    let table = await elementToBePresent("app-instance-preview > div > div > table", fixture) as HTMLTableElement;
    let titleRows = table.querySelectorAll(".titleRow") as NodeListOf<HTMLTableRowElement>;
    let prevTableRowCount = titleRows.length;
    // debugger;
    expect(prevTableRowCount).toEqual(18);

    let coresFilter = await elementToBePresent(`[data-filter-name="cores"]`, fixture) as HTMLElement;
    if (ENABLE_DEBUGGER) debugger;
    // we expect the cores input fields to exist
    expect(coresFilter).toBeTruthy();
    // lets get the max and min fields
    let numberInputMin = coresFilter.querySelector(`[data-number-input-min] input[type="number"]`) as HTMLInputElement;
    let numberInputMax = coresFilter.querySelector(`[data-number-input-max] input[type="number"]`) as HTMLInputElement;

    expect(numberInputMin).toBeTruthy();
    expect(numberInputMax).toBeTruthy();


    // when we change a value we expect the other inputs to update accordingly
    // we input a number in the minimum text field
    numberInputMin.value = "8";
    numberInputMin.dispatchEvent(new Event("input"));
    // we input a number in the maximum text field
    numberInputMax.value = "32";
    numberInputMax.dispatchEvent(new Event("input"));

    await domUpdate(fixture);

    let numberSliderMin = coresFilter.querySelector(`[data-number-slider-min]`) as HTMLInputElement;
    let numberSliderMax = coresFilter.querySelector(`[data-number-slider-max]`) as HTMLInputElement;

    expect(numberSliderMin).toBeTruthy();
    expect(numberSliderMax).toBeTruthy();
    expect(numberSliderMin.value).toBe("8");
    expect(numberSliderMax.value).toBe("32");

    if (ENABLE_DEBUGGER) debugger;
    // table = document.querySelector("app-instance-preview > div > div > table") as HTMLTableElement;
    let nextTitleRows = table.querySelectorAll(".titleRow") as NodeListOf<HTMLTableRowElement>;
    let nextTableRowCount = nextTitleRows.length;

    expect(nextTableRowCount).toEqual(7);

  }, ENABLE_DEBUGGER ? 100000000 : undefined);


  it("should switch the category and change filter and intancepreview", async () => {

    await domUpdate(fixture);
    // await fixture.whenStable();
    let appInstancePreview = await elementToBePresent("app-instance-preview", fixture);
    let appFilter = await elementToBePresent("app-filter", fixture);
    expect(appInstancePreview).toBeTruthy();
    expect(appFilter).toBeTruthy();

    // save the previous html
    let oldPreviewHTML = appInstancePreview.outerHTML;
    let oldFilterHTML = appFilter.outerHTML;

    // click on the second category
    let secondCategory = await elementToBePresent(`div[role="tab"][aria-posinset="2"]`, fixture) as HTMLElement;
    secondCategory.click();
    await domUpdate(fixture);
    // check if the instance preview and filter changes
    appInstancePreview = await elementToBePresent("app-instance-preview", fixture);
    appFilter = await elementToBePresent("app-filter", fixture);
    expect(appInstancePreview.outerHTML).not.toEqual(oldPreviewHTML);
    expect(appFilter.outerHTML).not.toEqual(oldFilterHTML);

  }, ENABLE_DEBUGGER ? 100000000 : undefined);
});
