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
import { Component, Input } from "@angular/core";
import { UnitCategorisation } from "../pricing/units";
import { INSTANCE_COMPARISON_FIXTURE } from "../fixtures/instance-comparison.fixture";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { InstanceComparison } from "./instance-comparison";

describe("InstanceConfigurationComponent", () => {
  let component: DialogWrapperComponent;
  let fixture: ComponentFixture<DialogWrapperComponent>;
  let dialogContent: InstanceConfigurationComponent;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        InstanceConfigurationComponent,
        TestFieldDisplayComponentMock,
        TestUnitDisplayComponentMock,
        TestUnitNumberComponentMock,
        TestUnitDivisionComponentMock,
        TestUnitDropdownComponentMock,
        DialogWrapperComponent
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
        MatDialogModule,
        MatSelectModule
      ],
      providers: [
        MatDialog
        // {
        //   // I was expecting this will pass the desired value
        //   provide: MAT_DIALOG_DATA,
        //   useValue: {
        //     data: { instance: INSTANCE_COMPARISON_FIXTURE }
        //   }
        // }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // element = fixture.nativeElement as HTMLElement;
    await component.openDialog(INSTANCE_COMPARISON_FIXTURE);
    dialogContent = component.dialogRef.componentInstance;
    fixture.detectChanges();

  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show the name of the instance", () => {
    expect(document.querySelector("[data-instance-name]")?.textContent?.trim())
      .toBe(INSTANCE_COMPARISON_FIXTURE.name);
  });

  it("should render all instance information display elements", () => {

    expect(document.querySelectorAll("app-field-display").length).toBe(2);
  });
  it("should render all instance pricing configuration elements", () => {
    expect(document.querySelectorAll("app-unit-display").length).toBe(0);
    expect(document.querySelectorAll("app-unit-division").length).toBe(1);
    expect(document.querySelectorAll("app-unit-dropdown").length).toBe(2);
    expect(document.querySelectorAll("app-unit-number").length).toBe(3);
  });
  it("should save the notes to the property and back", () => {
    let textarea = document.querySelector("[data-notes-input]") as HTMLTextAreaElement;
    textarea.value = "Hello World";
    textarea.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.dialogRef.componentInstance.noteText).toBe("Hello World");
  });

  it("should assign the correct number of instances and parse the value", () => {
    let instanceCount = document.querySelector("[type='number']") as HTMLInputElement;
    expect(instanceCount.value).toBe(component.dialogRef.componentInstance.instanceCountFormControl.value as string);
    instanceCount.value = "1234";
    instanceCount.dispatchEvent(new Event("input"));
    expect(component.dialogRef.componentInstance.instanceCountFormControl.value as any).toBe(1234);
  });

  it("should submit the form", () => {
    let submitButton = document.querySelector("button[type=\"submit\"]") as HTMLButtonElement;
    let spy = spyOn(component.dialogRef.componentInstance, "onSubmit").and.returnValue();
    submitButton.click();
    expect(spy).toHaveBeenCalled();
  });
});

@Component({
  selector: "app-field-display",
  template: "<p>app-field-display</p>"
})
class TestFieldDisplayComponentMock {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) value!: string;
}

@Component({
  selector: "app-unit-display",
  template: "<p>app-unit-display</p>"
})
class TestUnitDisplayComponentMock {
  @Input({ required: true }) unit!: UnitCategorisation;
}

@Component({
  selector: "app-unit-division",
  template: "<p>app-unit-division</p>"
})
class TestUnitDivisionComponentMock {
  @Input({ required: true }) unit!: UnitCategorisation;
}

@Component({
  selector: "app-unit-dropdown",
  template: "<p>app-unit-dropdown</p>"
})
class TestUnitDropdownComponentMock {
  @Input({ required: true }) unit!: UnitCategorisation;
}

@Component({
  selector: "app-unit-number",
  template: "<p>app-unit-number</p>"
})
class TestUnitNumberComponentMock {
  @Input({ required: true }) unit!: UnitCategorisation;
}

@Component({
  selector: "wrapper-component",
  template: "<p>Hello world</p>"
})
export class DialogWrapperComponent {
  public dialogRef!: MatDialogRef<InstanceConfigurationComponent, any>;

  constructor(public dialog: MatDialog) {
    // this.openDialog(INSTANCE_COMPARISON_FIXTURE)
  }

  openDialog(instance: InstanceComparison) {
    return new Promise((resolve) => {

      this.dialogRef = this.dialog.open(InstanceConfigurationComponent, {
        data: { instance },
        enterAnimationDuration: 0,
        exitAnimationDuration: 0
      });
      this.dialogRef.afterOpened().subscribe(resolve);
    });

  }

  protected readonly INSTANCE_COMPARISON_FIXTURE = INSTANCE_COMPARISON_FIXTURE;
}

