import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Product } from 'src/app/store/models/product';


@Component({
    selector: 'app-item-in-cart',
    templateUrl: './item-in-cart.component.html',
    styleUrls: ['./item-in-cart.component.less']
})
export class ItemInCartComponent implements OnInit {
    @Input() item!: Product;
    @Input() amount!: number;
    @Output() removeItemEvent = new EventEmitter<string>();
    @Output() updateItemAmountEvent = new EventEmitter<Object>();
    
    constructor() {}

    ngOnInit(): void {
    }

    counter(limit: number): number[] {
        return new Array(limit);
    }

    removeItem(){
        this.removeItemEvent.emit(this.item.name);
    }

    updateAmount(amount: number){
        this.updateItemAmountEvent.emit(amount);
    }
}
