import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {CategoryComponent} from "./category/category.component";
import {ComparisonComponent} from './comparison/comparison.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {RemoveInstanceComponent} from "./remove-instance/remove-instance.component";
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {FilterComponent} from './filter/filter.component';
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {NumberRegulatorComponent} from "./filter/number-regulator/number-regulator.component";

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ComparisonComponent,
    RemoveInstanceComponent,
    HeaderComponent,
    FilterComponent,
    NumberRegulatorComponent
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
    FormsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
