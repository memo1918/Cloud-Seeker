import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitDropdownComponent } from "./unit-dropdown.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatExpansionModule } from "@angular/material/expansion";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { Component, ViewChild } from "@angular/core";
import { TimeUnitCategorisation } from "../../pricing/timeunitcategorisation";

describe("UnitDropdownComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDropdownComponent, TestComponentWrapper],
      imports: [
        BrowserModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatInputModule,
        MatDividerModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatSelectModule
      ]
    });
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have all options", async () => {
    let select = document.querySelector("mat-select") as HTMLElement;
    select.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 10));

    for (let option of component.unit.options as string[]) {
      let element = document.querySelector(`[ng-reflect-value="${option}"]`);
      expect(element).toBeTruthy();
    }
  });
  it("should have the selected value", async () => {
    let select = document.querySelector("mat-select") as HTMLElement;
    select.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 10));
    // debugger;
    let selectedText = document.querySelector(".mat-mdc-select-value-text") as HTMLElement;
    expect(selectedText.textContent).toBe(component.unit.selected);
  });
  it("should update the value", async () => {
    let select = document.querySelector("mat-select") as HTMLElement;
    select.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 10));
    let element = document.querySelector(`[ng-reflect-value="second"]`) as HTMLElement;
    element.click();
    fixture.detectChanges();
    expect(component.unit.selected).toBe("second");
  });
});

@Component({
  selector: "test-component-wrapper",
  template: "<app-unit-dropdown #appUnitDropdownComponent [unit]=\"unit\"></app-unit-dropdown>"
})
class TestComponentWrapper {
  unit = TimeUnitCategorisation.create("hour");
  @ViewChild("appUnitDropdownComponent") appUnitDropdownComponent!: UnitDropdownComponent;
}
