import { createReducer, on } from '@ngrx/store';
import { addItem, checkOut, removeItem, updateItemAmount } from './cart.actions';
import { ItemInCart } from './models/item-in-cart';
import {keys, pick } from "lodash";


const initialState: ItemInCart = {};

export const cartReducer = createReducer(
	initialState,

	on(removeItem, (state, { itemName }) => ({
		...pick(state, keys(state).filter(key => key !== itemName))
	})),

	on(addItem, (state, { productName }) => ({
			...state,
			[productName]: 1
		})
	),
	on(updateItemAmount, (state, { itemName, amount }) => ({
		...state,
		[itemName]: amount
	})),

	on(checkOut, (_) => ({
		...initialState
	}))
);
