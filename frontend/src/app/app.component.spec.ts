import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MainComponent} from "./comparison/main/main.component";
import {MatTable, MatTableModule} from "@angular/material/table";
import {ShoppingCartService} from "./shopping-cart.service";


describe('AppComponent', () => {
  // let fakeShoppingCartService: ShoppingCartService = {
  //   items:[]
  // };

  beforeEach(() => {
    // fakeShoppingCartService


    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [MainComponent, AppComponent],
      providers: [ShoppingCartService]
    });
  });

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
});
