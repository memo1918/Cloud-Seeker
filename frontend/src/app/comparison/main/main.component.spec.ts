import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {MatTableModule} from "@angular/material/table";
import {AppComponent} from "../../app.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatExpansionModule, BrowserAnimationsModule],
      declarations: [MainComponent]
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('template', async () => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    fixture.autoDetectChanges(true);
    await fixture.whenRenderingDone()

 */

    it('should have correct data', async () => {
    const fixture = TestBed.createComponent(MainComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    fixture.autoDetectChanges(true);

    await fixture.whenRenderingDone()

    expect(compiled.querySelector("[data-additional-information]")).toBeTruthy();
    expect(compiled.querySelector("[data-additional-information]").textContent).toContain("CPU")
  });

  it('should display the correct amount of items', async () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    fixture.autoDetectChanges(true);
    await fixture.whenRenderingDone()

    expect(compiled.querySelectorAll("mat-accordion").length).toEqual(5);
  });

  it('should have correct instance name', async () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    fixture.autoDetectChanges(true);
    await fixture.whenRenderingDone()

    expect(compiled.querySelector("mat-expansion-panel-header").textContent).toContain("Instancename")
  });


})
