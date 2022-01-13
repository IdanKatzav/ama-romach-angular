import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";

import { Product } from 'src/app/shop/models/product';
import { ItemInCart } from '../models/item-in-cart';
import {AppState} from "../../app.state";
import { selectItems, selectProductsInCart, selectTotalPrice } from "../cart.selectors";
import { checkOut, removeItem, updateItemAmount } from "../cart.actions";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
    productsInCart$: Observable<Product[]>;
    itemsInCart$: Observable<ItemInCart>;
    totalPrice$: Observable<number>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.itemsInCart$ = this.getItemsInCart();
        this.productsInCart$ = this.getProductsInCart();
        this.totalPrice$ = this.getTotalPrice();
    }

    getItemsInCart(): Observable<ItemInCart> {
		return this.store.select(selectItems);
    }

    getProductsInCart(): Observable<Product[]> {
        return this.store.select(selectProductsInCart);
    }

    getTotalPrice(): Observable<number> {
        return this.store.select(selectTotalPrice);
    }

    checkOut() {
        this.store.dispatch(checkOut());
    }

	removeItemFromCart(itemName: string) {
		this.store.dispatch(removeItem({itemName}));
	}

	updateItemAmount(itemName: string, amount: number) {
		if (amount > 0) {
			this.store.dispatch(updateItemAmount({itemName, amount}));
		} else {
			this.store.dispatch(removeItem({itemName}));
		}
	}

	trackByFn(index: number, product:Product){
		return product.name;
	}
}
