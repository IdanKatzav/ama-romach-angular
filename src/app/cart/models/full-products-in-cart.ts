import { Product } from "src/app/shop/models/product";

export interface FullProductInCart {
    product: Product,
    amount: number,
}