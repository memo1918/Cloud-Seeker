import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioRegulatorComponent } from './radio-regulator.component';

describe('RadioRegulatorComponent', () => {
  let component: RadioRegulatorComponent;
  let fixture: ComponentFixture<RadioRegulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioRegulatorComponent]
    });
    fixture = TestBed.createComponent(RadioRegulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
