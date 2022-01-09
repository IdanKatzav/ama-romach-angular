import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopModule} from './shop/shop.module' ;
import { CartModule } from './cart/cart.module';
import { cartReducer } from './cart/cart.reducer';
import {EffectsModule} from "@ngrx/effects";
import {ProductsEffects} from "./shop/products.effects";
import {shopReducer} from "./shop/shop.reducer";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({ cart: cartReducer, shop: shopReducer}),
		StoreDevtoolsModule.instrument({ maxAge: 25 }),
		EffectsModule.forRoot([ProductsEffects]),
		ShopModule,
		CartModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
