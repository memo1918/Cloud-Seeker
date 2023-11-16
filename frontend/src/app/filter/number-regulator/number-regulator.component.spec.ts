import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRegulatorComponent } from './number-regulator.component';

describe('PriceRegulatorComponent', () => {
  let component: NumberRegulatorComponent;
  let fixture: ComponentFixture<NumberRegulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberRegulatorComponent]
    });
    fixture = TestBed.createComponent(NumberRegulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
