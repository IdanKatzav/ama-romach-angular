import { createSelector, createFeatureSelector } from '@ngrx/store';

import { selectProducts } from '../shop/shop.selectors';
import { Product } from '../shop/models/product';
import { ItemInCart } from './models/item-in-cart';

export const selectItems = createFeatureSelector<ItemInCart>('cart');

export const selectItemsAmount = createSelector(
    selectItems,
    (items: ItemInCart): number => {
        return Object.keys(items).length;
    }
);

export const selectProductsInCart = createSelector(
    selectItems,
    selectProducts,
    (items: ItemInCart, products: Product[]): Product[] => {
        let productsInCart = products.filter(product => !!items[product.name])
        return productsInCart;
    }
);

export const selectTotalPrice = createSelector(
    selectItems,
    selectProductsInCart,
    (items: ItemInCart, products: Product[]): number => {
        let totalPrice: number = 0;
        products.forEach((product) => {
            totalPrice += product.price * items[product.name];
        })
        return totalPrice;
    }
);

export const isProductInCart = (itemName: string) => createSelector(
	selectItems,
	(items) => {
		return !!items[itemName];
	}
)


