import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { MatTabsModule } from "@angular/material/tabs";
import { CategoryComponent } from "./category/category.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatExpansionModule } from "@angular/material/expansion";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { ComparisonComponent } from "./comparison/comparison.component";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { InstanceConfigurationComponent } from "./instance-configuration/instance-configuration.component";
import { UnitNumberComponent } from "./instance-configuration/unit-number/unit-number.component";
import { UnitDropdownComponent } from "./instance-configuration/unit-dropdown/unit-dropdown.component";
import { UnitDivisionComponent } from "./instance-configuration/unit-division/unit-division.component";
import { UnitDisplayComponent } from "./instance-configuration/unit-display/unit-display.component";
import { FieldDisplayComponent } from "./instance-configuration/field-display/field-display.component";
import { DialogComponent } from "./instance-configuration/dialog/dialog.component";
import { MatDialogModule } from "@angular/material/dialog";

describe("AppComponent", () => {
    beforeEach(() => TestBed.configureTestingModule({
            declarations: [
                CategoryComponent,
                AppComponent,
                ComparisonComponent,
                InstanceConfigurationComponent,
                UnitNumberComponent,
                UnitDropdownComponent,
                UnitDivisionComponent,
                UnitDisplayComponent,
              FieldDisplayComponent,
              DialogComponent
            ],
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
              MatSelectModule,
              MatDialogModule
            ]
        }
    ).compileComponents());

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'frontend'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual("frontend");
    });
})
;
