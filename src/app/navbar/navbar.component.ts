import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";

import {AppState} from "../app.state";
import {selectItemsAmount} from "../cart/cart.selectors";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
    numberOfItemsInCart$: Observable<number>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.numberOfItemsInCart$ = this.store.select(selectItemsAmount);
    }
}
