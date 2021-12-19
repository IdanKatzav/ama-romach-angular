import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Products } from './products-in-store-mockup';
import { Product } from './models/product';

@Injectable({
	providedIn: 'root'
})
export class ProductsInStoreService {
    private products: BehaviorSubject<Product[]> = new BehaviorSubject(Products);
	constructor() { }
    
    getProducts():BehaviorSubject<Product[]>{
        return this.products;
    }
}
