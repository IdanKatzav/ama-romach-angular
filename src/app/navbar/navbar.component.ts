import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Subject, takeUntil } from 'rxjs';
import { ItemsInCartService } from '../cart/items-in-cart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {
    numberOfItemsInCart: number;
    onDestroy$: Subject<void>;
    
    constructor(private itemsInCartService: ItemsInCartService) {
        this.numberOfItemsInCart = 0;
        this.onDestroy$ = new Subject<void>();
    }
    
    ngOnInit() {
        this.updateNumberOfItemsInCart();
    }

    updateNumberOfItemsInCart() {
        this.itemsInCartService.getItems().pipe(takeUntil(this.onDestroy$)).subscribe(items => {
            this.numberOfItemsInCart = Object.keys(items).length;
        });
    }

    ngOnDestroy() {
        this.onDestroy$.next();
    }
}
