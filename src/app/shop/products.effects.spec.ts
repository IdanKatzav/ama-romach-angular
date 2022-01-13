import {ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from "rxjs";
import {hot} from "jasmine-marbles";


import {ProductsEffects} from "./products.effects";
import {ProductsInStoreService} from "./products-in-store.service";
import {Product} from "./models/product";
import {loadProductsError, loadProductsSucceed} from "./shop.actions";
import {instance, mock, when} from "ts-mockito";
import {Action} from "@ngrx/store";

describe('ShopEffects', () => {
	let actions$: Observable<Action>;
	let effects: ProductsEffects;
	let productsServiceMock: ProductsInStoreService = mock(ProductsInStoreService);

	beforeEach(()=>{
		TestBed.configureTestingModule({
			providers: [
				ProductsEffects,
				provideMockActions(() => actions$),
				{ provide: ProductsInStoreService, useValue: instance(productsServiceMock) }
			],
		});
		effects = TestBed.inject(ProductsEffects);
	})

	it('should return ProductLoadError action', () => {
		when(productsServiceMock.getProducts()).thenReturn(throwError(() =>  new Error));
		actions$ = hot('a', {a: { type: ROOT_EFFECTS_INIT }});

		const expected = hot('a', { a: loadProductsError() });
		expect(effects.loadProducts$).toBeObservable(expected);
	});

	it('should return ProductLoadSucceed action', () => {
		const products: Product[] = [{
	 		name: 'abc',
			description: 'def',
			image: 'ghi',
			price: 100
	 	}];

		when(productsServiceMock.getProducts()).thenReturn(of(products));
		actions$ = hot('a', {a: {type: ROOT_EFFECTS_INIT}});

		const expected = hot('b', { b: loadProductsSucceed({products}) });
		expect(effects.loadProducts$).toBeObservable(expected);
	});
});
