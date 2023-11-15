import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InstanceConfigurationComponent } from "./instance-configuration.component";

describe("InstanceConfigurationComponent", () => {
  let component: InstanceConfigurationComponent;
  let fixture: ComponentFixture<InstanceConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceConfigurationComponent]
    });
    fixture = TestBed.createComponent(InstanceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
