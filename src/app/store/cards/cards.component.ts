import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsInStoreService } from '../products-in-store.service';
import { ItemsInCartService } from 'src/app/cart/items-in-cart.service';
import { ItemInCart } from 'src/app/cart/models/item-in-cart';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {

    public products: Product[] = [];
    public itemsInCart: ItemInCart = {};

    constructor(private productsInStoreService: ProductsInStoreService,
        private itemsInCartService: ItemsInCartService) { }

    ngOnInit(): void {
        this.getProductsInStore();
        this.getItemsInCart();
    }

    getProductsInStore() {
        this.productsInStoreService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }
    
    getItemsInCart() {
        this.itemsInCartService.getItems().subscribe((items) => {
            this.itemsInCart = items;
        });
    }

    addToCart(productName: string) {
        this.itemsInCartService.addItem(productName);
    }

    removeFromCart(productName: string) {
        this.itemsInCartService.removeItem(productName);
    }
}
