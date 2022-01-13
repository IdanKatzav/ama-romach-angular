import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './models/product';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class ProductsInStoreService {
	private  productsURL: string = '/assets/serverMock/products-in-store-mockup.json';
	constructor(private httpClient: HttpClient) { }

    getProducts():Observable<Product[]>{
		return this.httpClient.get<Product[]>(this.productsURL);
    }
}
