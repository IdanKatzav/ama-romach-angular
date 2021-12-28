import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/store/models/product';
import { ItemsInCartService } from '../items-in-cart.service';
import { ItemInCart } from '../models/item-in-cart';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
    productsInCart$: Observable<Product[]>;
    itemsInCart$: Observable<ItemInCart>;
    totalPrice$: Observable<number>;

    constructor(private itemsInCartService: ItemsInCartService) {
    }

    ngOnInit(): void {
        this.itemsInCart$ = this.getItemsInCart();
        this.productsInCart$ = this.getProductsInCart();
        this.totalPrice$ = this.getTotalPrice();
    }

    getItemsInCart(): Observable<ItemInCart> {
        return this.itemsInCartService.getItems();
    }

    getProductsInCart(): Observable<Product[]> {
        return this.itemsInCartService.getFullProductsInCart();
    }

    getTotalPrice(): Observable<number> {
        return this.itemsInCartService.totalPrice();
    }

    checkOut() {
        this.itemsInCartService.checkOut();
    }

    // getItemAmount(itemName: string): number {
    //     return this.itemsInCartService.getItemAmount(itemName);
    // }

    removeItemFromCart(itemName: string) {
        this.itemsInCartService.removeItem(itemName);
    }

    updateItemAmount(itemName: string, amount: number) {
        if (amount > 0) {
            this.itemsInCartService.updateProductsAmount(itemName, amount);
        } else {
            this.removeItemFromCart(itemName);
        }
    }

    trackByFn(index: number, product:Product){
        return product.name;
    }
}
