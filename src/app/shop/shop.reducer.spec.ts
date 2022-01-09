import { shopReducer, emptyShop } from './shop.reducer'
import {Action} from "@ngrx/store";
import {loadProductsSucceed} from "./shop.actions";
import {Product} from "./models/product";
import {Products} from "./products-in-store-mockup";

describe('ShopReducer', ()  => {
	it('should return the default state after given unknown action', () => {
		const action: Action = {
			type: 'Unknown',
		}

		const state = shopReducer(emptyShop, action);
		expect(state).toBe(emptyShop);
	});

	it('should return state of loaded products after given loadProductSucceed action', () => {
		let products: Product[] = Products;
		const action: Action = loadProductsSucceed({ products });

		const state = shopReducer(emptyShop, action);
		expect(state).toBe(Products);
	});
});
