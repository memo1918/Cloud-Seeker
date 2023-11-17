import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRegulatorComponent } from './dropdown-regulator.component';

describe('DropdownRegulatorComponent', () => {
  let component: DropdownRegulatorComponent;
  let fixture: ComponentFixture<DropdownRegulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownRegulatorComponent]
    });
    fixture = TestBed.createComponent(DropdownRegulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
