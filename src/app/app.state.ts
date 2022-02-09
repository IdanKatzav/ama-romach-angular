import { ItemInCart } from "./cart/models/item-in-cart";
import { Product } from "./shop/models/product";


export interface AppState {
    shop: Product[],
    cart: ItemInCart
}
