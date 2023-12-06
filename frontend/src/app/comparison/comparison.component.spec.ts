import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ComparisonComponent } from "./comparison.component";
import { ShoppingCartDummyService } from "./shopping-cart-dummy-service";
import { ShoppingCartService } from "../shopping-cart.service";
import {getTestBedDeclarations, getTestBedImports} from "../testbed.app";

const ENABLE_DEBUGGER = false;

describe('ComparisonComponent', () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //Mock for shopping cart service because the default shopping cart service holds no items by default
      ...getTestBedDeclarations(),
      ...getTestBedImports(),
      providers: [
        {provide: ShoppingCartService, useClass: ShoppingCartDummyService}
      ],
      ...getTestBedImports(),
    });
    fixture = TestBed.createComponent(ComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //checks if the component exists
    expect(component).toBeTruthy();
  });

  it('should display correct data in chip', () => {
    //selects the first chip that gets created
    fixture.detectChanges();
    let chip = document.querySelector("mat-chip") as HTMLElement
    //compare the text content of the chip
    expect(chip.textContent).toBe(" 371.57 USD ")
  });

  it('should select cheapest option', () => {
    //get a list of all the chips
    let chips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>
    //check if the data of chip 3 is correct
    expect(chips[2].textContent).toBe(" 55.03 USD ")
    //the ng-reflect-highlighted attribute shows if a chip is currently highlighted or not
    //checks the highlighted status of all chips in the first row, only the cheapest is supposed to be true
    expect(chips[2].getAttribute("ng-reflect-highlighted") == "true")
    expect(chips[1].getAttribute("ng-reflect-highlighted") == "false")
    expect(chips[0].getAttribute("ng-reflect-highlighted") == "false")
  });

  it('should switch highlighted option', async () => {
    //get a list of all chips
    let chips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>
    //click on the first chip, this chip is not selected by default
    chips[0].click()
    //detect changes is necessary to update the data after the click
    fixture.detectChanges()
    //checks if the correct chip is selected in row 1, also checks if the other chips in row 1 are unselected
    expect(chips[0].getAttribute("ng-reflect-highlighted") == "true")
    expect(chips[1].getAttribute("ng-reflect-highlighted") == "false")
    expect(chips[2].getAttribute("ng-reflect-highlighted") == "false")
  });

  it('should display correct data in table title', () => {
    //gat the title of the first expandable table
    let tableTitle = document.querySelector("mat-panel-title") as HTMLElement
    //checks if the title is correct
    expect(tableTitle.textContent).toBe(" Virtual Machines / AWSOutposts / Compute Engine ")
  });

  it('should display correct data in table body', async () => {
    //select the first element of the table to be able to click on it
    let tableElement = document.querySelector("mat-expansion-panel-header") as HTMLElement
    //click on the table to expand it
    tableElement.click()
    //detect changes is necessary to update the data after the click
    fixture.detectChanges()
    //ge the text of the now expanded table
    let tableContent = document.querySelector(".mat-expansion-panel-content") as HTMLElement
    //check if the text is what it's supposed to be
    expect(tableContent.textContent).toContain(" cores:  32 ")
    expect(tableContent.textContent).toContain(" memory:  256 GiB ")
    expect(tableContent.textContent).toContain(" regionCode:  us-east-2 ")
    expect(tableContent.textContent).toContain(" operatingSystem:  Windows ")
    expect(tableContent.textContent).toContain(" storage:  EBS only ")
    expect(tableContent.textContent).toContain(" gpuMemory:  NA ")
    expect(tableContent.textContent).toContain(" clockSpeed:  NA ")
  });

  it('should show the correct message if the shopping cart is empty', async () => {
    //remove the contents of the shopping cart
    ShoppingCartDummyService.Instance.setItems([])
    //detect changes is necessary to update the data after changing the items in the shopping cart
    fixture.detectChanges()
    //get the element that contains the text if the shopping cart is empty
    let displayText = document.querySelector("p")as HTMLParagraphElement
    //check if the text is correct
    expect(displayText.textContent).toBe(" The shopping cart is empty ")
    //get a table element if there is one
    let tableElement = document.querySelector("mat-expansion-panel-header")as HTMLElement
    //there is not supposed to be a table element, therefore we check if it is falsy
    expect(tableElement).toBeFalsy()
  });

  it('should remove elements with remove button', () => {
    let removeButton = document.querySelector("button") as HTMLElement
    let tableElements = document.querySelectorAll("td") as NodeListOf<HTMLElement>
    expect(tableElements.length).toBe(16)
    removeButton.click()
    fixture.detectChanges()
    tableElements = document.querySelectorAll("td") as NodeListOf<HTMLElement>
    expect(tableElements.length).toBe(12)
  });
  it('should remove multiple elements with remove button', () => {
    let removeButton = document.querySelector("button") as HTMLElement
    let tableElements = document.querySelectorAll("td") as NodeListOf<HTMLElement>
    expect(tableElements.length).toBe(16)
    removeButton.click()
    fixture.detectChanges()
    removeButton = document.querySelector("button") as HTMLElement
    removeButton.click()
    fixture.detectChanges()
    tableElements = document.querySelectorAll("td") as NodeListOf<HTMLElement>
    expect(tableElements.length).toBe(8)
  });
});
