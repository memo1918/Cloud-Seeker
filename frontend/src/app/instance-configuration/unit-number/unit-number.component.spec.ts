import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitNumberComponent } from "./unit-number.component";
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
import { NumberUnitCategorisation } from "../../pricing/numberunitcategorisation";

describe("UnitNumberComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitNumberComponent, TestComponentWrapper],
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
  it("should render the number", () => {
    let input = document.querySelector("[data-unit-number]") as HTMLInputElement;
    expect(input.value).toBe((component.unit as NumberUnitCategorisation).value + "");
  });
  it("should update the unit", () => {
    let input = document.querySelector("[data-unit-number]") as HTMLInputElement;
    input.value = "5678";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.unitNumberComponent.numberFormControl.value as any).toBe(5678);
  });
});

@Component({
  selector: "test-component-wrapper",
  template: "<app-unit-number #unitnumber [unit]=\"unit\"></app-unit-number>"
})
class TestComponentWrapper {
  unit = NumberUnitCategorisation.create("1");
  @ViewChild("unitnumber") unitNumberComponent!: UnitNumberComponent;
}
