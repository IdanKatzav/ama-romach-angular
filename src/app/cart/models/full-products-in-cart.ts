import { Product } from "src/app/store/models/product";

export interface FullProductInCart {
    product: Product,
    amount: number,
}