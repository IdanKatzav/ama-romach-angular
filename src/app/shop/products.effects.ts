import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import {ProductsInStoreService} from "./products-in-store.service";
import {loadProductsError, loadProductsSucceed} from "./shop.actions";


@Injectable()

export class ProductsEffects {
    loadProducts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
          mergeMap(() =>
            this.productsService.getProducts$().pipe(
				map((products) => loadProductsSucceed({products})),
				catchError(() => of(loadProductsError()))
          ),
        ))
    );


    constructor(
        private actions$: Actions,
        private productsService: ProductsInStoreService
    ){}
}
