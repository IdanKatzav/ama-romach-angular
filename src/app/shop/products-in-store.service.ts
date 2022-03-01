import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './models/product';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class ProductsInStoreService {
	private readonly productsURL: string;
	constructor(private httpClient: HttpClient) {
		this.productsURL = environment.server.amaRomachServerAddress + environment.server.productsPath;
	}

    getProducts$(): Observable<Product[]>{
		return this.httpClient.get<Product[]>(this.productsURL);
	}
}
