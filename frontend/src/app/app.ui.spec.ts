import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app.module";
import { AppComponent } from "./app.component";
import { FetchMockSpec } from "./fetch.mock.spec";
import { dummyApplicationData } from "./mocks/fetch/applicationdummydata";
import { domUpdate, elementToBePresent } from "./spec.helper";
import { ShoppingCartService } from "./shopping-cart.service";

describe("UI-Tests", () => {
  let application: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let interval: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    FetchMockSpec.getInstance().setSpy();
    FetchMockSpec.getInstance().setResponseData(dummyApplicationData);

    fixture = TestBed.createComponent(AppComponent);
    application = fixture.componentInstance;
    interval = setInterval(() => fixture.detectChanges(), 2);
  });

  afterEach(() => {
    FetchMockSpec.getInstance().resetResponseData();
    clearInterval(interval);
  });

  it("should create", async () => {
    expect(application).toBeTruthy();
  });

  it("should filter by region configure a instance and add a item to the shopping cart", async () => {

    await domUpdate(fixture);
    debugger;
    let dropdown = await elementToBePresent(`[data-filter-name="regionCode"] mat-select`, fixture) as HTMLElement;

    // we expect the region code dropdown to exist
    expect(dropdown).toBeTruthy();
    // let's click on the region code dropdown
    dropdown.click();

    await domUpdate(fixture);

    // we now expect the dropdown to be open and to contain our elements
    let items = document.querySelectorAll("mat-option>span") as NodeListOf<HTMLSpanElement>;
    let options = ["None", "ap-northeast-3", "eu-central-2", "eu-south-1", "eu-west-3", "us-east-1", "us-east-1-nyc-1", "us-east-2", "us-gov-east-1", "us-gov-west-1", "us-west-2", "us-west-2-den-1"];

    expect(items.length).toBe(options.length);
    for (let i = 0; i < items.length; i++) {
      expect(items[i].innerText).toBe(options[i]);
    }

    // lets click on eu-south-1
    items[3].click();
    await domUpdate(fixture);

    debugger;

    // we expect the selection to update to one filter
    dropdown = await elementToBePresent(`[data-filter-name="regionCode"] mat-select`, fixture) as HTMLElement;
    expect(dropdown.innerText).toBe(options[3]);

    // we check the number of results
    let table = await elementToBePresent("app-instance-preview > div > div > table", fixture);
    let titleRows = table.querySelectorAll(".titleRow") as NodeListOf<HTMLTableRowElement>;
    expect(titleRows.length).toBe(1);
    let fieldRows = table.querySelectorAll(".fieldRow") as NodeListOf<HTMLTableRowElement>;
    expect(fieldRows.length).toBe(1);
    let fieldCells = fieldRows[0].querySelectorAll("td") as NodeListOf<HTMLTableCellElement>;
    // we check the numer of filters
    expect(fieldCells.length).toBe(8);

    // we check if a button exists in the last cell to open the dialog
    let buttonCell = fieldCells[7];
    let button = buttonCell.querySelector("app-instance-configuration-dialog button") as HTMLButtonElement;
    // expect the add instance button to exist
    expect(button).toBeTruthy();

    // click the add instance button to open the dialog
    button.click();
    let dialog = await elementToBePresent("app-instance-configuration", fixture);
    debugger;

    // expect the title to be identical to the title in the first row
    let title = dialog.querySelector("h1");
    expect(title).toBeTruthy();
    expect(title!.innerText).toBe(titleRows[0].innerText);


    // expect being able to take notes
    let htmlTextAreaElement = dialog.querySelector("[data-notes-input]") as HTMLTextAreaElement;
    let unitInputField = dialog.querySelector("input[data-unit-number]") as HTMLInputElement;
    let dropdownComponent = dialog.querySelector("mat-select") as HTMLElement;
    // lets set the note
    const noteForTesting = "this is my note for testing";
    htmlTextAreaElement.value = noteForTesting;

    htmlTextAreaElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    // enter different number in the price configuration
    unitInputField.value = "8";
    unitInputField.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    // select default units
    dropdownComponent.click();

    debugger;


    let submitButton = dialog.querySelector(`button[type="submit"]`) as HTMLButtonElement;
    // debugger;
    submitButton.click();
    await domUpdate(fixture);
    expect(document.querySelector("app-instance-configuration")).toBeFalsy();

    debugger;

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
    debugger;
  }, 100000);

  it("should filter by cpu and add instance to the shopping cart", async () => {
    await domUpdate(fixture);
    let coresFilter = await elementToBePresent(`[data-filter-name="cores"]`, fixture) as HTMLElement;
    // debugger;
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

    await domUpdate(fixture);

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


  }, 100000);

});
