import { createAction, props } from "@ngrx/store";
import { Product } from "./models/product";

export const loadProductsSucceed = createAction('[Products Service] Products Loaded', props<{products: Product[]}>());

export const loadProductsError = createAction('[Products Service] Products Load Failed');
