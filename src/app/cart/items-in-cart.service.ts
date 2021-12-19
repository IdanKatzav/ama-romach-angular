import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Product } from '../store/models/product';
import { ProductsInStoreService } from '../store/products-in-store.service';
import { ItemInCart } from './models/item-in-cart';

@Injectable({
    providedIn: 'root'
})
export class ItemsInCartService {
    private itemsInCart: BehaviorSubject<ItemInCart> = new BehaviorSubject<ItemInCart>({});
    constructor(private productsInStore: ProductsInStoreService) { }

    addItem(itemName: string) {
        const items = this.itemsInCart.getValue();
        console.log(items);
        items[itemName] = 1;
        this.itemsInCart.next(items);
    }

    removeItem(itemName: string) {
        let items = this.itemsInCart.getValue();
        delete items[itemName];
        this.itemsInCart.next(items);
    }

    updateProductsAmount(itemName: string, newAmount: number) {
        let items = this.itemsInCart.getValue();
        items[itemName] = newAmount;
        this.itemsInCart.next(items);
    }

    totalPrice(): Observable<number>{
        return combineLatest(this.itemsInCart, this.productsInStore.getProducts(), (items, products) => {
            let totalPrice: number = 0;
            products.forEach((product) => {
                totalPrice += product.price * items[product.name] || 0;
            });
            return totalPrice;
        });
    }
    getFullProductsInCart(): Observable<Product[]> {
        return combineLatest(this.itemsInCart, this.productsInStore.getProducts(), (items, products) => {
            let productsInCart = products.filter((product) => {
                return items[product.name] !== undefined ;
            });
            return productsInCart;
        });
    }

    getItems(): BehaviorSubject<ItemInCart>{
        return this.itemsInCart;
    }

    isItemInCart(itemName: string): boolean {
        return this.itemsInCart.getValue()[itemName] !== undefined;
    }

    checkOut(){
        this.itemsInCart.next({});
    }

    getItemAmount(itemName: string): number{
        return this.itemsInCart.getValue()[itemName];
    }
}
