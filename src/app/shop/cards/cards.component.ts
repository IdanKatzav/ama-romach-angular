import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";

import {AppState} from "../../app.state";
import { Product } from '../models/product';
import {isProductInCart} from "../../cart/cart.selectors";
import { selectProducts } from "../shop.selectors";
import { addItem, removeItem } from "../../cart/cart.actions";

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {
    productsInStore$: Observable<Product[]>;

	constructor(private store: Store<AppState>) {
	}

    ngOnInit() {
        this.productsInStore$ = this.store.select(selectProducts);
    }

    isProductInCart(itemName: string): Observable<boolean> {
        return this.store.select(isProductInCart(itemName));
    }

    addToCart(productName: string) {
        this.store.dispatch(addItem({productName}));
    }

    removeFromCart(productName: string) {
        this.store.dispatch(removeItem({itemName: productName}));
    }

    trackByFn(index: number, productInStore: Product) {
        return productInStore.name;
    }
}
