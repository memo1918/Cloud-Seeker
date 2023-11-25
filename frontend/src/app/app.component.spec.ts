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
import { RemoveInstanceComponent } from "./remove-instance/remove-instance.component";
import { HeaderComponent } from "./header/header.component";
import { FilterComponent } from "./filter/filter.component";
import { NumberRegulatorComponent } from "./filter/number-regulator/number-regulator.component";
import { DropdownRegulatorComponent } from "./filter/dropdown-regulator/dropdown-regulator.component";
import { PreviewPanelComponent } from "./previewpanel/preview-panel.component";
import { InstancePreviewComponent } from "./instance-preview/instance-preview.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatBadgeModule } from "@angular/material/badge";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatRippleModule } from "@angular/material/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatRadioModule } from "@angular/material/radio";

describe("AppComponent", () => {
    beforeEach(() => TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CategoryComponent,
        ComparisonComponent,
        RemoveInstanceComponent,
        HeaderComponent,
        FilterComponent,
        NumberRegulatorComponent,
        DropdownRegulatorComponent,
        PreviewPanelComponent,
        InstancePreviewComponent,
        InstanceConfigurationComponent,
        FieldDisplayComponent,
        UnitNumberComponent,
        UnitDropdownComponent,
        UnitDivisionComponent,
        UnitDisplayComponent,
        DialogComponent
      ],
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
      ],
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
