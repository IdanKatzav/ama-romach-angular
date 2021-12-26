import { TestBed } from '@angular/core/testing';
import { timeout } from 'rxjs';
import { Product } from '../store/models/product';

import { ItemsInCartService } from './items-in-cart.service';
import { ItemInCart } from './models/item-in-cart';

describe('ItemsInCartService', () => {
    let service: ItemsInCartService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ItemsInCartService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return empty Items Record', () => {
        const emptyItemsRecord: ItemInCart = {}
        service.getItems().subscribe((items) => {
            expect(items).toEqual(emptyItemsRecord);
        })
    });

    it('should add an Item to cart and get it from the observable subscription', () => {
        const emptyItemsRecord: ItemInCart = {}
        const itemToAdd: string = 'idna'
        const itemsAfterAddition: ItemInCart = { [itemToAdd]: 1 }

        let cartItems: ItemInCart = {}
        service.getItems().subscribe((items) => {
            cartItems = items;
        })
        expect(cartItems).toEqual(emptyItemsRecord);
        service.addItem(itemToAdd);
        // setTimeout(() => {
        //     expect(cartItems).toBe(itemsAfterAddition);
        // }, 500)
        expect(cartItems).toEqual(itemsAfterAddition);
    });

    it('should add an Item to cart and remove it from cart', () => {
        const emptyItemsRecord: ItemInCart = {}
        const itemToAdd: string = 'Coconut'
        const itemsAfterAddition: ItemInCart = { [itemToAdd]: 1 }

        let cartItems: ItemInCart = {}
        service.getItems().subscribe((items) => {
            cartItems = items;
        })
        expect(cartItems).toEqual(emptyItemsRecord);
        service.addItem(itemToAdd);
        expect(cartItems).toEqual(itemsAfterAddition);
        service.removeItem(itemToAdd);
        expect(cartItems).toEqual(emptyItemsRecord);
    });

    it('should update amount of product in cart', () => {
        const emptyItemsRecord: ItemInCart = {};
        const itemName: string = 'Coconut';
        const updateAmount: number = 4;
        const itemsAfterAddition: ItemInCart = { [itemName]: 1 }
        const itemsAfterUpdateAmount: ItemInCart = { [itemName]: updateAmount }

        let cartItems: ItemInCart = {}
        service.getItems().subscribe((items) => {
            cartItems = items;
        })
        expect(cartItems).toEqual(emptyItemsRecord);
        service.addItem(itemName);
        expect(cartItems).toEqual(itemsAfterAddition);
        service.updateProductsAmount(itemName, updateAmount);
        expect(cartItems).toEqual(itemsAfterUpdateAmount);
    });

    it('should calculate total price of empty cart', () => {
        const emptyCartPrice: number = 0;

        let cartTotalPrice: number;
        service.totalPrice().subscribe((totalPrice) => {
            cartTotalPrice = totalPrice;
        })
        expect(cartTotalPrice).toEqual(emptyCartPrice);
    });

    it('should calculate total price of cart with one product with amount different then 1', () => {
        const emptyCartPrice: number = 0;
        const itemPrice: number = 200;
        const itemName: string = 'WS License';
        const itemAmount: number = 5;

        let cartTotalPrice: number;
        service.totalPrice().subscribe((totalPrice) => {
            cartTotalPrice = totalPrice;
        })
        expect(cartTotalPrice).toEqual(emptyCartPrice);
        service.addItem(itemName);
        expect(cartTotalPrice).toEqual(itemPrice);
        service.updateProductsAmount(itemName, itemAmount);
        expect(cartTotalPrice).toEqual(itemPrice* itemAmount);   
    });
    
    it('should calculate total price of cart with some products with amount different then 1', () => {
        const emptyCartPrice: number = 0;
        const cartPrice: number = 2000;
        const itemName: string = 'WS License';
        const secondItemName: string = 'Coconut';
        const itemAmount: number = 5;
        const secondItemAmount: number = 10;

        let cartTotalPrice: number;
        service.totalPrice().subscribe((totalPrice) => {
            cartTotalPrice = totalPrice;
        })
        expect(cartTotalPrice).toEqual(emptyCartPrice);
        service.addItem(itemName);
        service.updateProductsAmount(itemName, itemAmount);
        service.addItem(secondItemName);
        service.updateProductsAmount(secondItemName, secondItemAmount);
        expect(cartTotalPrice).toEqual(cartPrice);   
    });
    
    it('should retuen all the product in empty cart', () => {
        const emptyProductsArray: Product[] = [];
        service.getFullProductsInCart().subscribe((products) => {
            expect(products).toEqual(emptyProductsArray);
        })
    });
    
    it('should retuen all the product in cart with one item', () => {
        const emptyProductsArray: Product[] = [];
        const productsArrayAfterAddition: Product[] = [{
            "name": "WS License",
            "description": "Rar WS license. No need for military email",
            "price": 200.00,
            "image": "../../assets/images/ws.png"
        }];
        const itemName: string = 'WS License';
        let productsInCart: Product[];
        
        service.getFullProductsInCart().subscribe((products) => {
            productsInCart = products;
        });
        expect(productsInCart).toEqual(emptyProductsArray);
        
        service.addItem(itemName);
        expect(productsInCart).toEqual(productsArrayAfterAddition);
    });
    
    it('should retuen all the product in cart with one item', () => {
        const emptyProductsArray: Product[] = [];
        const productsArrayAfterAddition: Product[] = [{
            "name": "WS License",
            "description": "Rar WS license. No need for military email",
            "price": 200.00,
            "image": "../../assets/images/ws.png"
        },{
            "name": "Coconut",
            "description": "Good coconut to make oil for your bread",
            "price": 100.00,
            "image": "../../assets/images/coconut.png",
            "limit": 5
        }];
        const itemName: string = 'WS License';
        const secondItemName: string = 'Coconut';
        let productsInCart: Product[];
        
        service.getFullProductsInCart().subscribe((products) => {
            productsInCart = products;
        });  
        expect(productsInCart).toEqual(emptyProductsArray);
        
        service.addItem(itemName);
        service.addItem(secondItemName);
        expect(productsInCart).toEqual(productsArrayAfterAddition);
    });
    
    it('should execute Checkout to cart with some products with amount different then 1', () => {
        const emptyCartPrice: number = 0;
        const cartPrice: number = 2000;
        const itemName: string = 'WS License';
        const secondItemName: string = 'Coconut';
        const itemAmount: number = 5;
        const secondItemAmount: number = 10;
    
        let cartTotalPrice: number;
        service.totalPrice().subscribe((totalPrice) => {
            cartTotalPrice = totalPrice;
        })
        expect(cartTotalPrice).toEqual(emptyCartPrice);
        
        service.addItem(itemName);
        service.updateProductsAmount(itemName, itemAmount);
        service.addItem(secondItemName);
        service.updateProductsAmount(secondItemName, secondItemAmount);
        expect(cartTotalPrice).toEqual(cartPrice);
        
        service.checkOut();   
        expect(cartTotalPrice).toEqual(emptyCartPrice);
    });
    it('should execute Checkout to empty cart', () => {
        const emptyCartPrice: number = 0;
    
        let cartTotalPrice: number;
        service.totalPrice().subscribe((totalPrice) => {
            cartTotalPrice = totalPrice;
        })
        expect(cartTotalPrice).toEqual(emptyCartPrice);
        
        service.checkOut();
        expect(cartTotalPrice).toEqual(emptyCartPrice);   
    });
    
});
