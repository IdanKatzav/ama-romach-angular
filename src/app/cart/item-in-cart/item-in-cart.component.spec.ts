import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/store/models/product';
import { ItemInCartComponent } from './item-in-cart.component';

describe('ItemInCartComponent', () => {
    let component: ItemInCartComponent;
    let fixture: ComponentFixture<ItemInCartComponent>;
    const mockItem: Product = {
        image: "",
        description: "",
        name: "Coconut",
        price: 10,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemInCartComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemInCartComponent);
        component = fixture.componentInstance;
        component.amount = 1;
        component.item = mockItem;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should raise removeItemEvent when removeItem() has been called', () => {
        jest.spyOn(component.removeItemEvent, 'emit');
        component.removeItem();
        expect(component.removeItemEvent.emit).toHaveBeenCalledWith(component.item.name);
    });

    it('should raise updateItemAmountEvent when updateAmount() been called', () => {
        let expectedAmount: number = 5;
        component.updateItemAmountEvent.emit = jest.fn();

        component.updateAmount(expectedAmount);
        expect(component.updateItemAmountEvent.emit).toHaveBeenCalledWith(expectedAmount);
    });

    it('should raise updateItemAmountEvent when updateInputAmount() been called', () => {
        let expectedAmount: number = 5;
        let inputEvent: object = {
            target: {
                value: expectedAmount
            }
        };
        component.updateItemAmountEvent.emit = jest.fn();

        component.updateInputAmount(inputEvent);
        expect(component.updateItemAmountEvent.emit).toHaveBeenCalledWith(expectedAmount);
    });
});
