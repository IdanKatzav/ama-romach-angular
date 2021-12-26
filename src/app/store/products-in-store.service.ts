import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Products } from './products-in-store-mockup';
import { Product } from './models/product';

@Injectable({
	providedIn: 'root'
})
export class ProductsInStoreService {
    private products: BehaviorSubject<Product[]> = new BehaviorSubject(Products);
	constructor() { }
    
    getProducts():Observable<Product[]>{
        return this.products.asObservable();
    }
}
