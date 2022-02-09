import { shopReducer } from './shop.reducer'
import {Action} from "@ngrx/store";
import {loadProductsSucceed} from "./shop.actions";
import {Product} from "./models/product";

describe
('ShopReducer', ()  => {
	const emptyShop = [];
	it('should return the default state after given unknown action', () => {
		const action: Action = {
			type: 'Unknown',
		}

		const state = shopReducer(emptyShop, action);
		expect(state).toBe(emptyShop);
	});

	it('should return state of loaded products after given loadProductSucceed action', () => {
		const products: Product[] = [{
			name: 'abc',
			description: 'def',
			image: 'ghi',
			price: 100
		}];
		const action: Action = loadProductsSucceed({ products });

		const state = shopReducer(emptyShop, action);
		expect(state).toBe(products);
	});
});
