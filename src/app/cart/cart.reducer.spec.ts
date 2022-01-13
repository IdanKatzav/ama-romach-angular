import { cartReducer} from "./cart.reducer";
import {Action} from "@ngrx/store";

import {addItem, checkOut, removeItem, updateItemAmount} from "./cart.actions";
import {ItemInCart} from "./models/item-in-cart";

describe('CartReducer', ()  => {
	const emptyCart = {};
	it('should return the default state after given unknown action', () => {
		const action: Action = {
			type: 'Unknown',
		}

		const state = cartReducer(emptyCart, action);
		expect(state).toEqual(emptyCart);
	});

	it('should return state of empty cart after given removeItem action', () => {
		const itemName = 'Coconut';
		const previousState: ItemInCart = {
			[itemName]: 1
		}
		const action: Action = removeItem({ itemName });

		const state = cartReducer(previousState, action);
		expect(state).toEqual(emptyCart);
	});

	it('should return state of one item after given addItem action', () => {
		const productName = 'Coconut';
		const finishState: ItemInCart = {
			[productName]: 1
		}
		const action: Action = addItem({ productName });

		const state = cartReducer(emptyCart, action);
		expect(state).toEqual(finishState);
	});

	it('should return state of one item with amount of 3 after given updateItemAmount action', () => {
		const itemName = 'Coconut';
		const newAmount: number = 3;
		const startState: ItemInCart = {
			[itemName]: 1
		}
		const finishState: ItemInCart = {
			[itemName]: newAmount
		}
		const action: Action = updateItemAmount({ itemName, amount: newAmount });

		const state = cartReducer(startState, action);
		expect(state).toEqual(finishState);
	});

	it('should return state of empty cart after given checkOut action', () => {
		const itemName = 'Coconut';

		const startState: ItemInCart = {
			[itemName]: 3
		}
		const action: Action = checkOut();

		const state = cartReducer(startState, action);
		expect(state).toEqual(emptyCart);
	});
});
