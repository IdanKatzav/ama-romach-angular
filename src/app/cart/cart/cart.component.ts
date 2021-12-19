import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/store/models/product';
import { ItemsInCartService } from '../items-in-cart.service';
import { ItemInCart } from '../models/item-in-cart';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
    public productsInCart: Product[] = [];
    public itemsInCart: ItemInCart = {};
    public totalPrice: number = 0;

    constructor(private itemsInCartService: ItemsInCartService) { }

    ngOnInit(): void {
        this.getItemsInCart();
        this.getProductsInCart();
        this.getTotalPrice();
    }

    getItemsInCart() {
        this.itemsInCartService.getItems().subscribe((items) => { this.itemsInCart = items });
    }

    getProductsInCart() {
        this.itemsInCartService.getFullProductsInCart().subscribe((products) => { this.productsInCart = products });
    }

    getTotalPrice() {
        this.itemsInCartService.totalPrice().subscribe((totalPrice) => { this.totalPrice = totalPrice })
    }

    checkOut() {
        this.itemsInCartService.checkOut();
    }

    getItemAmount(itemName: string): number {
        return this.itemsInCartService.getItemAmount(itemName);
    }

    removeItemFromCart(itemName: string) {
        this.itemsInCartService.removeItem(itemName);
    }

    updateItemAmount(itemName: string, amount: Object) {
        this.itemsInCartService.updateProductsAmount(itemName, amount as number);
    }
}
