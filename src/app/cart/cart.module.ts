import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ItemInCartComponent } from './item-in-cart/item-in-cart.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatSelectModule } from '@angular/material/select'



@NgModule({
    declarations: [
        CartComponent,
        ItemInCartComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        AppRoutingModule
    ],
    exports: [
        CartComponent
    ]
})
export class CartModule { }
