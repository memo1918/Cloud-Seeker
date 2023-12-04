import { TestModuleMetadata } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CategoryComponent } from "./category/category.component";
import { ComparisonComponent } from "./comparison/comparison.component";
import { RemoveInstanceComponent } from "./remove-instance/remove-instance.component";
import { HeaderComponent } from "./header/header.component";
import { FilterComponent } from "./filter/filter.component";
import { NumberRegulatorComponent } from "./filter/number-regulator/number-regulator.component";
import { DropdownRegulatorComponent } from "./filter/dropdown-regulator/dropdown-regulator.component";
import { PreviewPanelComponent } from "./previewpanel/preview-panel.component";
import { InstancePreviewComponent } from "./instance-preview/instance-preview.component";
import { InstanceConfigurationComponent } from "./instance-configuration/instance-configuration.component";
import { FieldDisplayComponent } from "./instance-configuration/field-display/field-display.component";
import { UnitNumberComponent } from "./instance-configuration/unit-number/unit-number.component";
import { UnitDropdownComponent } from "./instance-configuration/unit-dropdown/unit-dropdown.component";
import { UnitDivisionComponent } from "./instance-configuration/unit-division/unit-division.component";
import { UnitDisplayComponent } from "./instance-configuration/unit-display/unit-display.component";
import { DialogComponent } from "./instance-configuration/dialog/dialog.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatExpansionModule } from "@angular/material/expansion";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
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
import { InstancePreviewService} from "./instance-preview/instance-preview.service";

export function getTestBedModules() {
  return {
    ...getTestBedDeclarations(),
    ...getTestBedImports(),
    providers: []
  } as TestModuleMetadata;
}

export function getTestBedImports() {
  return {
    imports: [
      BrowserModule,
      MatExpansionModule,
      NoopAnimationsModule,
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
      MatSelectModule
    ]
  };
}

export function getTestBedDeclarations() {
  return {
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
      DialogComponent,
      InstancePreviewComponent
    ]
  };
}
