import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MainComponent} from './main.component';
import {MatTabsModule} from "@angular/material/tabs";

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatTabsModule],
            declarations: [MainComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('category component should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'categoryComponent'`, waitForAsync(() => {
        expect(component.title).toEqual('categoryComponent');
    }));
});
