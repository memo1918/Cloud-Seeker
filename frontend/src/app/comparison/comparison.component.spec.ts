import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparisonComponent } from './comparison.component';
import {ShoppingCartDummyService} from "./shopping-cart-dummy-service";
import {ShoppingCartService} from "../shopping-cart.service";
import { getTestBedImports } from "../testbed.app.module";

describe('ComparisonComponent', () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({

      declarations: [ComparisonComponent],
      providers:[
        { provide: ShoppingCartService, useClass: ShoppingCartDummyService}
      ],
      ...getTestBedImports(),
    });
    fixture = TestBed.createComponent(ComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct data in chip', () => {
    let chip = document.querySelector("mat-chip")as HTMLElement
    expect(chip.textContent).toBe(" 371.57 USD ")
  });

  it('should select cheapest option', () => {
    let chips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>
    expect(chips[2].textContent).toBe(" 55.03 USD ")
    expect(chips[2].getAttribute("ng-reflect-highlighted")=="true")
    expect(chips[1].getAttribute("ng-reflect-highlighted")=="false")
    expect(chips[0].getAttribute("ng-reflect-highlighted")=="false")
  });

  it('should switch highlighted option', async () => {
    let chips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>
    //debugger
    chips[0].click()
    fixture.detectChanges()
    //debugger
    expect(chips[0].getAttribute("ng-reflect-highlighted")=="true")
    expect(chips[1].getAttribute("ng-reflect-highlighted")=="false")
    expect(chips[2].getAttribute("ng-reflect-highlighted")=="false")
  });

  it('should display correct data in table title', () => {
    let tableTitle = document.querySelector("mat-panel-title")as HTMLElement
    expect(tableTitle.textContent).toBe(" Virtual Machines / AWSOutposts / Compute Engine ")
  });

  it('should display correct data in table body', async () => {
    let tableElement = document.querySelector("mat-expansion-panel-header")as HTMLElement
    //debugger
    tableElement.click()
    fixture.detectChanges()
    let tableContent = document.querySelector(".mat-expansion-panel-content")as HTMLElement
    //debugger
    //document.querySelector("[data-notes]")
    expect(tableContent.textContent).toContain(" cores:  32 ")
    expect(tableContent.textContent).toContain(" memory:  256 GiB ")
    expect(tableContent.textContent).toContain(" regionCode:  us-east-2 ")
    expect(tableContent.textContent).toContain(" operatingSystem:  Windows ")
    expect(tableContent.textContent).toContain(" storage:  EBS only ")
    expect(tableContent.textContent).toContain(" gpuMemory:  NA ")
    expect(tableContent.textContent).toContain(" clockSpeed:  NA ")
  });
});
