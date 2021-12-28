
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsInCartService } from '../items-in-cart.service';
import { CartComponent } from './cart.component';


describe('CartComponent', () => {
    let itemsInCartService: Partial<ItemsInCartService>; 
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    itemsInCartService = {
        updateProductsAmount: jest.fn(),
        removeItem: jest.fn(),
        getItems: jest.fn(),
        getFullProductsInCart: jest.fn(),
        totalPrice: jest.fn(),
        checkOut: jest.fn(),
    };

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
        component.removeItemFromCart(itemName)
        expect(itemsInCartService.removeItem).toHaveBeenCalledWith(itemName);
    });
    
    it('should call itemsInCartService.updateItemAmount() with the correct parameters', () => {
        const itemName: string = 'Coconut';
        const itemAmount: number = 4;
        component.updateItemAmount(itemName, itemAmount)
        expect(itemsInCartService.updateProductsAmount).toHaveBeenCalledWith(itemName, itemAmount);
    });
    
    it('should call itemsInCartService.removeItem() with the correct parameters after not positive update', () => {
        const itemName: string = 'Coconut';
        const itemAmount: number = -1;
        component.updateItemAmount(itemName, itemAmount)
        expect(itemsInCartService.removeItem).toHaveBeenCalledWith(itemName);
    });

    it('should call itemsInCartService.totalPrice()', () => {
        component.getTotalPrice();
        expect(itemsInCartService.totalPrice).toHaveBeenCalled();
    });
    
    it('should call itemsInCartService.checkOut()', () => {
        component.checkOut();
        expect(itemsInCartService.checkOut).toHaveBeenCalled();
    });
    
    it('should call itemsInCartService.getItems()', () => {
        component.getItemsInCart();
        expect(itemsInCartService.getItems).toHaveBeenCalled();
    });
    
    it('should call itemsInCartService.getItems()', () => {
        component.getProductsInCart();
        expect(itemsInCartService.getFullProductsInCart).toHaveBeenCalled();
    });    
});
