import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RemoveInstanceComponent } from "./remove-instance.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";

describe('RemoveInstanceComponent', () => {
  let component: RemoveInstanceComponent;
  let fixture: ComponentFixture<RemoveInstanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    fixture = TestBed.createComponent(RemoveInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
