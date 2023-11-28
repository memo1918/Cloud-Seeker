import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ComparisonComponent } from "./comparison.component";
import { getTestBedImports } from "../testbed.app.module";

describe("ComparisonComponent", () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      declarations: [ComparisonComponent]
    });
    fixture = TestBed.createComponent(ComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
