import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitDivisionComponent } from "./unit-division.component";
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
import { Component } from "@angular/core";
import { DivisionUnitCategorisation } from "../../pricing/divisionunitcategorisation";

describe("UnitDivisionComponent", () => {
  let component: TestComponentWrapper;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDivisionComponent, TestComponentWrapper],
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
    let element = fixture.nativeElement as HTMLElement;
    expect(element.innerText.trim()).toBe("per");
  });
});

@Component({
  selector: "test-component-wrapper",
  template: "<app-unit-division [unit]=\"unit\"></app-unit-division>"
})
class TestComponentWrapper {
  unit = DivisionUnitCategorisation.create("/");
}
