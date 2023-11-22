import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPanelComponent } from './preview-panel.component';

describe('PreviewpanelComponent', () => {
  let component: PreviewPanelComponent;
  let fixture: ComponentFixture<PreviewPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewPanelComponent]
    });
    fixture = TestBed.createComponent(PreviewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
