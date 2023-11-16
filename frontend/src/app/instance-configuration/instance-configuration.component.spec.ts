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
import { Component, Input, ViewChild } from "@angular/core";
import { UnitCategorisation } from "../pricing/units";
import { ConfigurationService } from "./configuration.service";
import { INSTANCE_COMPARISON_FIXTURE } from "./instance-comparison.component.fixture.spec";

describe("InstanceConfigurationComponent", () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  let element: HTMLElement;

  class DummyConfigurationService extends ConfigurationService {
    override instanceComparison = INSTANCE_COMPARISON_FIXTURE;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestWrapperComponent, InstanceConfigurationComponent, TestFieldDisplayComponentMock, TestUnitDisplayComponentMock, TestUnitNumberComponentMock, TestUnitDivisionComponentMock, TestUnitDropdownComponentMock],
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
      ],
      providers: [{ provide: ConfigurationService, useClass: DummyConfigurationService }]
    });
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show the name of the instance", () => {
    expect(element.querySelector("[data-instance-name]")?.textContent?.trim())
      .toBe(INSTANCE_COMPARISON_FIXTURE.name);
  });

  it("should render all instance information display elements", () => {
    expect(element.querySelectorAll("app-field-display").length).toBe(2);
  });
  it("should render all instance pricing configuration elements", () => {
    expect(element.querySelectorAll("app-unit-display").length).toBe(0);
    expect(element.querySelectorAll("app-unit-division").length).toBe(1);
    expect(element.querySelectorAll("app-unit-dropdown").length).toBe(2);
    expect(element.querySelectorAll("app-unit-number").length).toBe(3);
  });
  it("should save the notes to the property and back", () => {
    let textarea = document.querySelector("[data-notes-input]") as HTMLTextAreaElement;
    textarea.value = "Hello World";
    textarea.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.appinstance.noteText).toBe("Hello World");
  });

  it("should assign the correct number of instances and parse the value", () => {
    let instanceCount = document.querySelector("[type='number']") as HTMLInputElement;
    expect(instanceCount.value).toBe(component.appinstance.instanceCountFormControl.value as string);
    instanceCount.value = "1234";
    instanceCount.dispatchEvent(new Event("input"));
    expect(component.appinstance.instanceCountFormControl.value as any).toBe(1234);
  });

  it("should submit the form", () => {
    let submitButton = document.querySelector("button[type=\"submit\"]") as HTMLButtonElement;
    let spy = spyOn(component.appinstance, "onSubmit").and.returnValue();
    submitButton.click();
    expect(spy).toHaveBeenCalled();
  });
});

@Component({
  selector: "test-wrapper-component",
  template: "<app-instance-configuration #appinstance />"
})
class TestWrapperComponent {
  @ViewChild("appinstance") appinstance!: InstanceConfigurationComponent;
}


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
