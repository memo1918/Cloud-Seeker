import {TestBed} from '@angular/core/testing';

import {APIService} from './api.service';
import {SAMPLE_CATEGORIES} from "./api.service.fixtures";

describe('APIService', () => {
    let service: APIService;
    let okResponse: Response;
    let okCategory: Response;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(APIService);
        okResponse = new Response(JSON.stringify({"data": {"visitors": 5}}), {status: 200, statusText: 'OK'});
        okCategory = new Response(JSON.stringify({"data": {"categories": SAMPLE_CATEGORIES}}), {status: 200, statusText: 'OK'});
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("should manage the loading state", async () => {
        spyOn(window, 'fetch').and.resolveTo(okResponse);
        expect(service.counterLoading).toBeTruthy();
        await service.loadCounter();
        expect(service.counterLoading).toBeFalse();
    });

    it("should set the correct visitor counter", async () => {
        spyOn(window, 'fetch').and.resolveTo(okResponse);
        expect(service.counter).toBeNull();
        await service.loadCounter();
        expect(service.counter).toBe(5);
    });

    it("should compute the correct api url", async () => {
        spyOn(window, 'fetch').and.callFake(function () {
            expect(arguments.length).toBe(1);
            expect(arguments[0]).toContain("/api")
            expect(arguments[0]).toContain(window.location.origin)
            return Promise.resolve(okResponse);
        })
        await service.loadCounter();
    });

    //categories testing
    it("should load the correct categories", async () => {
        spyOn(window, 'fetch').and.resolveTo(okCategory);
        expect(service.categories).toEqual([]);
        await service.loadCategories();
        expect(service.categories).toEqual(SAMPLE_CATEGORIES as any);
    });
});
