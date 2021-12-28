import { Component, OnInit } from '@angular/core';
import { ItemsInCartService } from '../../../../src/app/cart/items-in-cart.service';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product';
import { ProductsInStoreService } from '../products-in-store.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {
    productsInStore$: Observable<Product[]>;
    onDestroy$: Subject<void>;

    constructor(private itemsInCartService: ItemsInCartService,
        private productsInStoreService: ProductsInStoreService) {
    }

    ngOnInit() {
        this.productsInStore$ = this.getProductsInStore();
    }

    isProductInCart(itemName: string): boolean {
        return this.itemsInCartService.isItemInCart(itemName);
    }

    getProductsInStore(): Observable<Product[]> {
        return this.productsInStoreService.getProducts();
    }

    addToCart(productName: string) {
        this.itemsInCartService.addItem(productName);
    }

    removeFromCart(productName: string) {
        this.itemsInCartService.removeItem(productName);
    }

    trackByFn(index: number, productInStore: Product) {
        return productInStore.name;
    }
}