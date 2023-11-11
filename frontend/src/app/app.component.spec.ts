import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MatTabsModule} from "@angular/material/tabs";
import {CategoryComponent} from "./category/category.component";
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from "@angular/platform-browser";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {ComparisonComponent} from "./comparison/comparison.component";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
      declarations: [CategoryComponent, AppComponent, ComparisonComponent],
      imports: [
          RouterTestingModule,
          BrowserModule,
          MatExpansionModule,
          BrowserAnimationsModule,
          MatTableModule,
          MatTabsModule
      ]
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
