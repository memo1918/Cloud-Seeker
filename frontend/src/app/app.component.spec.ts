import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { getTestBedDeclarations, getTestBedImports } from "./testbed.app.module";

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    TestBed.compileComponents();
  });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'frontend'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual("frontend");
    });
})
;
