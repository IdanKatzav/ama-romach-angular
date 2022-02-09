import { createReducer, on } from "@ngrx/store";
import { Product } from "./models/product";
import { loadProductsSucceed } from "./shop.actions";

const initialState: Product[] = [];

export const shopReducer = createReducer(
    initialState,

    on(loadProductsSucceed, (_, { products }) => (products))
);
