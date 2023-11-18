import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { CategoryComponent } from "./category/category.component";
import { ComparisonComponent } from "./comparison/comparison.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { RemoveInstanceComponent } from "./remove-instance/remove-instance.component";
import { InstanceConfigurationComponent } from "./instance-configuration/instance-configuration.component";
import { FieldDisplayComponent } from "./instance-configuration/field-display/field-display.component";
import { MatInputModule } from "@angular/material/input";
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

@NgModule({
    declarations: [
        AppComponent,
        CategoryComponent,
        ComparisonComponent,
        RemoveInstanceComponent,
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
        MatInputModule,
        MatDividerModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
      MatSelectModule,
      MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
