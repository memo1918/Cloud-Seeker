import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MainComponent} from "./category/main/main.component";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
      declarations: [MainComponent, AppComponent],
      imports: [MatTabsModule]
    }
  ).compileComponents())

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });
})
;
