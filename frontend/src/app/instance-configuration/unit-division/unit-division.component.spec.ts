import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitDivisionComponent } from "./unit-division.component";

describe("UnitDivisionComponent", () => {
  let component: UnitDivisionComponent;
  let fixture: ComponentFixture<UnitDivisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDivisionComponent]
    });
    fixture = TestBed.createComponent(UnitDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
