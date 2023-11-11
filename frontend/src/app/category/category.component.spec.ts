import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CategoryComponent} from './category.component';
import {MatTabsModule} from "@angular/material/tabs";

describe('MainComponent', () => {
    let component: CategoryComponent;
    let fixture: ComponentFixture<CategoryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatTabsModule],
            declarations: [CategoryComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CategoryComponent);
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
