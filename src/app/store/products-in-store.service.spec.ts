import { TestBed } from '@angular/core/testing';

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
});
