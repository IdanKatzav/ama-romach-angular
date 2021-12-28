import { TestBed } from '@angular/core/testing';
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

    it('should return empty Items Record', (done) => {
        const emptyItemsRecord: ItemInCart = {}
        service.getItems().subscribe((items) => {
            expect(items).toEqual(emptyItemsRecord);
            done();
        });
    });

    it('should add an Item to cart and get it from the observable subscription', (done) => {
        const itemToAdd: string = 'idna'
        const itemsAfterAddition: ItemInCart = { [itemToAdd]: 1 }

        service.addItem(itemToAdd);

        service.getItems().subscribe((items) => {
            expect(items).toEqual(itemsAfterAddition);
            done();
        })
    });

    it('should add an Item to cart and remove it from cart', (done) => {
        const emptyItemsRecord: ItemInCart = {}
        const itemToAdd: string = 'Coconut';

        service.addItem(itemToAdd);
        service.removeItem(itemToAdd);

        service.getItems().subscribe((items) => {
            expect(items).toEqual(emptyItemsRecord);
            done();
        });
    });

    it('should update amount of product in cart', (done) => {
        const itemName: string = 'Coconut';
        const updateAmount: number = 4;
        const itemsAfterUpdateAmount: ItemInCart = { [itemName]: updateAmount }

        service.addItem(itemName);
        service.updateProductsAmount(itemName, updateAmount);

        service.getItems().subscribe((items) => {
            expect(items).toEqual(itemsAfterUpdateAmount);
            done();
        });
    });

    it('should calculate total price of empty cart', (done) => {
        const emptyCartPrice: number = 0;

        service.totalPrice().subscribe((totalPrice) => {
            expect(totalPrice).toEqual(emptyCartPrice);
            done();
        });
    });

    it('should calculate total price of cart with one product with amount different then 1', (done) => {
        const itemPrice: number = 200;
        const itemName: string = 'WS License';
        const itemAmount: number = 5;

        service.addItem(itemName);
        service.updateProductsAmount(itemName, itemAmount);
        service.totalPrice().subscribe((totalPrice) => {
            expect(totalPrice).toEqual(itemPrice * itemAmount);
            done();
        });

    });

    it('should calculate total price of cart with some products with amount different then 1', (done) => {
        const cartPrice: number = 2000;
        const itemName: string = 'WS License';
        const secondItemName: string = 'Coconut';
        const itemAmount: number = 5;
        const secondItemAmount: number = 10;

        service.addItem(itemName);
        service.addItem(secondItemName);
        service.updateProductsAmount(itemName, itemAmount);
        service.updateProductsAmount(secondItemName, secondItemAmount);

        service.totalPrice().subscribe((totalPrice) => {
            expect(totalPrice).toEqual(cartPrice);
            done();
        });

    });

    it('should retuen all the product in empty cart', (done) => {
        const emptyProductsArray: Product[] = [];
        service.getFullProductsInCart().subscribe((products) => {
            expect(products).toEqual(emptyProductsArray);
            done();
        });
    });

    it('should retuen all the product in cart with one item', (done) => {
        const productsArrayAfterAddition: Product[] = [{
            "name": "WS License",
            "description": "Rar WS license. No need for military email",
            "price": 200.00,
            "image": "../../assets/images/ws.png"
        }];
        const itemName: string = 'WS License';

        service.addItem(itemName);
        service.getFullProductsInCart().subscribe((products) => {
            expect(products).toEqual(productsArrayAfterAddition);
            done();
        });
    });

    it('should retuen all the product in cart with one item', (done) => {
        const productsArrayAfterAddition: Product[] = [{
            "name": "WS License",
            "description": "Rar WS license. No need for military email",
            "price": 200.00,
            "image": "../../assets/images/ws.png"
        }, {
            "name": "Coconut",
            "description": "Good coconut to make oil for your bread",
            "price": 100.00,
            "image": "../../assets/images/coconut.png",
            "limit": 5
        }];
        const itemName: string = 'WS License';
        const secondItemName: string = 'Coconut';


        service.addItem(itemName);
        service.addItem(secondItemName);
        service.getFullProductsInCart().subscribe((products) => {
            expect(products).toEqual(productsArrayAfterAddition);
            done();
        });
    });

    it('should execute Checkout to cart with some products with amount different then 1', (done) => {
        const emptyCartPrice: number = 0;
        const itemName: string = 'WS License';
        const secondItemName: string = 'Coconut';
        const itemAmount: number = 5;
        const secondItemAmount: number = 10;

        service.addItem(itemName);
        service.updateProductsAmount(itemName, itemAmount);
        service.addItem(secondItemName);
        service.updateProductsAmount(secondItemName, secondItemAmount);
        service.checkOut();
        service.totalPrice().subscribe((totalPrice) => {
            expect(totalPrice).toEqual(emptyCartPrice);
            done();
        })
    });

    it('should execute Checkout to empty cart', (done) => {
        const emptyCartPrice: number = 0;

        service.checkOut();
        service.totalPrice().subscribe((totalPrice) => {
           expect(totalPrice).toEqual(emptyCartPrice);
        });
        done();
    });

});
