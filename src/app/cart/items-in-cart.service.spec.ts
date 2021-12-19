import { TestBed } from '@angular/core/testing';

import { ItemsInCartService } from './items-in-cart.service';

describe('ItemsInCartService', () => {
  let service: ItemsInCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsInCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
