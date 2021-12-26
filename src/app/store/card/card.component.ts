import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../models/product';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
    @Input() product!: Product;
    @Input() isProductInCart!: boolean;
    @Output() addProductEvent = new EventEmitter<string>();
    @Output() removeProductEvent = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void { 
        console.log('shit')
    }

    addToCart() {
        this.addProductEvent.emit(this.product.name);
    }

    removeFromCart() {
        this.removeProductEvent.emit(this.product.name);
    }
}
