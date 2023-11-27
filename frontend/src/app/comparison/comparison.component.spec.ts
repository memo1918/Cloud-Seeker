import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparisonComponent } from './comparison.component';
import {BrowserModule} from "@angular/platform-browser";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {ShoppingCartDummyService} from "./shopping-cart-dummy-service";
import {ShoppingCartService} from "../shopping-cart.service";
import {MatChipsModule} from "@angular/material/chips";
import {MatRadioButton, MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatRippleModule} from "@angular/material/core";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {CartItem} from "../models/cart-item";


describe('ComparisonComponent', () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        MatBadgeModule,
        MatListModule,
        MatInputModule,
        MatSliderModule,
        MatRippleModule,
        MatGridListModule,
        MatButtonModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatIconModule,
        MatChipsModule,
        MatRadioModule,
        FormsModule,
      ],
      declarations: [ComparisonComponent],
      providers:[
        { provide: ShoppingCartService, useClass: ShoppingCartDummyService}
      ]
    });
    fixture = TestBed.createComponent(ComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display correct data in chip', () => {
    //let chips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>
    let chip = document.querySelector("mat-chip")as HTMLElement
    expect(chip.textContent).toBe(" 371.57 USD ")
  });
  it('should display correct data in all chips', () => {
    let chips = document.querySelectorAll("mat-chip") as NodeListOf<HTMLElement>
    for (let i = 0; i < chips.length; i++) {
      //expect(chips[i].textContent).toBe(ShoppingCartDummyService.Instance.getItems)
    }
  });
});
