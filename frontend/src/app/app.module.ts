import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { CategoryComponent } from "./category/category.component";
import { ComparisonComponent } from "./comparison/comparison.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { RemoveInstanceComponent } from "./remove-instance/remove-instance.component";
import { InstancePreviewComponent } from "./instance-preview/instance-preview.component";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";
import { InstanceConfigurationComponent } from "./instance-configuration/instance-configuration.component";
import { FieldDisplayComponent } from "./instance-configuration/field-display/field-display.component";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UnitNumberComponent } from "./instance-configuration/unit-number/unit-number.component";
import { UnitDropdownComponent } from "./instance-configuration/unit-dropdown/unit-dropdown.component";
import { UnitDivisionComponent } from "./instance-configuration/unit-division/unit-division.component";
import { UnitDisplayComponent } from "./instance-configuration/unit-display/unit-display.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { DialogComponent } from "./instance-configuration/dialog/dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatChipsModule } from "@angular/material/chips";
import { MatRadioModule } from "@angular/material/radio";
import { HeaderComponent } from "./header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatBadgeModule } from "@angular/material/badge";
import { FilterComponent } from "./filter/filter.component";
import { MatListModule } from "@angular/material/list";
import { NumberRegulatorComponent } from "./filter/number-regulator/number-regulator.component";
import { MatRippleModule } from "@angular/material/core";
import { DropdownRegulatorComponent } from "./filter/dropdown-regulator/dropdown-regulator.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { PreviewPanelComponent } from "./previewpanel/preview-panel.component";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TagsComponent } from "./filter/tags/tags.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ToastmessageComponent } from "./toastmessage/toastmessage.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
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
        TagsComponent,
        ToastmessageComponent,
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
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
