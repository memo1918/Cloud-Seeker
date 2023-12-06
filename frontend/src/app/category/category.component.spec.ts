import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CategoryComponent } from "./category.component";
import { getTestBedImports } from "../testbed.app";

describe('MainComponent', () => {
    let component: CategoryComponent;
    let fixture: ComponentFixture<CategoryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
          ...getTestBedImports(),
            declarations: [CategoryComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CategoryComponent);
        component = fixture.componentInstance;
    });

    it('category component should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'categoryComponent'`, waitForAsync(() => {
        expect(component.title).toEqual('categoryComponent');
    }));
});
