import { createFeatureSelector } from "@ngrx/store";
import { Product } from "./models/product";

export const selectProducts = createFeatureSelector<Product[]>('shop');
