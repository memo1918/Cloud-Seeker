import {TestBed} from '@angular/core/testing';
import {CategoryService} from './category.service';
import {MatTabChangeEvent} from "@angular/material/tabs";

describe('CategoryService', () => {
    let service: CategoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CategoryService);
        spyOn(service, 'setSelectedCategory');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("should initialize selectedIndex", () => {
        expect(service.selectedIndex).toBeDefined();
    });

    it("should set selected category on tab change", () => {
        const tabChangeEvent: MatTabChangeEvent = {index: 1} as MatTabChangeEvent;

        service.onTabChange(tabChangeEvent);

        expect(service.selectedIndex).toEqual(1);
        expect(service.setSelectedCategory).toHaveBeenCalled;
        expect(service.selectedCategory).toEqual(service.getCategories()[1]);
    });
});
