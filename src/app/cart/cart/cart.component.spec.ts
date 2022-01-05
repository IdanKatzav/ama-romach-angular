
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsInCartService } from '../items-in-cart.service';
import { CartComponent } from './cart.component';

import {verify, mock, instance} from 'ts-mockito';

describe('CartComponent', () => {
    let itemsInCartService: Partial<ItemsInCartService>; 
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    const mockedItemService = mock(ItemsInCartService);
    
    itemsInCartService = instance(mockedItemService);
    console.log(itemsInCartService)

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers:[{provide: ItemsInCartService, useValue: itemsInCartService}],
            declarations: [CartComponent]
        }).compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        itemsInCartService = TestBed.inject(ItemsInCartService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call itemsInCartService.removeItem() with the correct parameters', () => {
        const itemName: string = 'Coconut';
        component.removeItemFromCart(itemName);
        verify(mockedItemService.removeItem(itemName)).called();
    });
    
    it('should call itemsInCartService.updateItemAmount() with the correct parameters', () => {
        const itemName: string = 'Coconut';
        const itemAmount: number = 4;
        component.updateItemAmount(itemName, itemAmount);
        verify(mockedItemService.updateProductsAmount(itemName, itemAmount)).called();
    });
    
    it('should call itemsInCartService.removeItem() with the correct parameters after not positive update', () => {
        const itemName: string = 'Coconut';
        const itemAmount: number = -1;
        component.updateItemAmount(itemName, itemAmount);
        verify(mockedItemService.removeItem(itemName)).called();
    });

    it('should call itemsInCartService.totalPrice()', () => {
        component.getTotalPrice();
        verify(mockedItemService.totalPrice()).called();
    });
    
    it('should call itemsInCartService.checkOut()', () => {
        component.checkOut();
        verify(mockedItemService.checkOut()).called();
    });
    
    it('should call itemsInCartService.getItems()', () => {
        component.getItemsInCart();
        verify(mockedItemService.getItems()).called();
    
    });
    
    it('should call itemsInCartService.getItems()', () => {
        component.getProductsInCart();
        verify(mockedItemService.getFullProductsInCart()).called();
    });    
});
