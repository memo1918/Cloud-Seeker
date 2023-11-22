import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogComponent } from "./dialog.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { INSTANCE_COMPARISON_FIXTURE } from "../../fixtures/instance-comparison.fixture";
import { InstanceConfigurationComponent } from "../instance-configuration.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

describe("DialogComponent", () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DialogComponent,
        InstanceConfigurationComponent
      ],
      imports: [
        NoopAnimationsModule,
        BrowserModule,
        MatExpansionModule,
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
      providers: [
        MatDialog
        // {provide: InstanceConfigurationComponent, useClass: TestInstanceConfigurationComponent,}
      ]
    });
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("button should open the dialog", () => {
    let button = document.querySelector("[data-open-dialog-button]") as HTMLButtonElement;
    let spy = spyOn(component, "openDialog");
    button.click();
    expect(spy).toHaveBeenCalled();
  });
  it("should pass the correct data to the dialog", async () => {
    let dialogRef = await component.openDialog(INSTANCE_COMPARISON_FIXTURE);
    expect(dialogRef.componentInstance.data).toEqual({ instance: INSTANCE_COMPARISON_FIXTURE });
  });
});
