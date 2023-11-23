import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRegulatorComponent } from './dropdown-regulator.component';
import { BrowserModule } from "@angular/platform-browser";
import { MatExpansionModule } from "@angular/material/expansion";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatBadgeModule } from "@angular/material/badge";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatRippleModule } from "@angular/material/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatChipsModule } from "@angular/material/chips";
import { MatRadioModule } from "@angular/material/radio";

describe('DropdownRegulatorComponent', () => {
  let component: DropdownRegulatorComponent;
  let fixture: ComponentFixture<DropdownRegulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownRegulatorComponent],
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
        MatChipsModule,
        MatRadioModule,
        FormsModule
    ]
    });
    fixture = TestBed.createComponent(DropdownRegulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
