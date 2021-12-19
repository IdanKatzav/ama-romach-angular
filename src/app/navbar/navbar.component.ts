import { Component, OnInit } from '@angular/core';
import { ItemsInCartService } from '../cart/items-in-cart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
    public numberOfItemsInCart: number = 0;
    constructor(private itemsInCartService: ItemsInCartService) { }

    ngOnInit(): void {
        this.updateNumberOfItemsInCart();
    }

    updateNumberOfItemsInCart(){
        this.itemsInCartService.getItems().subscribe(items => {
            this.numberOfItemsInCart = Object.keys(items).length;
        });
    }
}
