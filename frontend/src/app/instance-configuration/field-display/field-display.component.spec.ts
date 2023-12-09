import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FieldDisplayComponent } from "./field-display.component";
import { getTestBedImports } from "../../testbed.app";


describe("FieldDisplayComponent", () => {
  let component: FieldDisplayComponent;
  let fixture: ComponentFixture<FieldDisplayComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldDisplayComponent],
      ...getTestBedImports()
    });

    fixture = TestBed.createComponent(FieldDisplayComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the name and value", () => {
    component.name = "5678";
    component.value = "1234";
    fixture.detectChanges();
    let root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector("p.body-2")?.textContent).toBe("5678");
    expect(root.querySelector("p.body-1")?.textContent).toBe("1234");
    expect(root.querySelector("b>p.body-2")).toBeTruthy();
  });


});
