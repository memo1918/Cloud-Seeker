import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitNumberComponent } from "./unit-number.component";

describe("UnitNumberComponent", () => {
  let component: UnitNumberComponent;
  let fixture: ComponentFixture<UnitNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitNumberComponent]
    });
    fixture = TestBed.createComponent(UnitNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
