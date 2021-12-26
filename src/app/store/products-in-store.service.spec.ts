import { TestBed } from '@angular/core/testing';
import { Products } from './products-in-store-mockup';

import { ProductsInStoreService } from './products-in-store.service';

describe('ProductsInStoreService', () => {
    let service: ProductsInStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductsInStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return full products Observable', () => {
        service.getProducts().subscribe((products) => {
            expect(products).toEqual(Products);
        });
    })
});
