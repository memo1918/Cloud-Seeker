import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstanceConfigurationComponent } from "./instance-configuration.component";
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
import { FieldDisplayComponent } from "./field-display/field-display.component";
import { UnitDisplayComponent } from "./unit-display/unit-display.component";
import { UnitNumberComponent } from "./unit-number/unit-number.component";
import { UnitDivisionComponent } from "./unit-division/unit-division.component";
import { UnitDropdownComponent } from "./unit-dropdown/unit-dropdown.component";

describe("InstanceConfigurationComponent", () => {
  let component: InstanceConfigurationComponent;
  let fixture: ComponentFixture<InstanceConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceConfigurationComponent, FieldDisplayComponent, UnitDisplayComponent, UnitNumberComponent, UnitDivisionComponent, UnitDropdownComponent],
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
    fixture = TestBed.createComponent(InstanceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
