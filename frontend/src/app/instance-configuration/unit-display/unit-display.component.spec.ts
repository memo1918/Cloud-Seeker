import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitDisplayComponent } from "./unit-display.component";

describe("UnitDisplayComponent", () => {
  let component: UnitDisplayComponent;
  let fixture: ComponentFixture<UnitDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDisplayComponent]
    });
    fixture = TestBed.createComponent(UnitDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
