import { TestBed } from '@angular/core/testing';
import { ProductsInStoreService } from './products-in-store.service';
import {HttpClientModule} from "@angular/common/http";

describe('ProductsInStoreService', () => {
    let service: ProductsInStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
			imports: [HttpClientModule]
		});
        service = TestBed.inject(ProductsInStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
