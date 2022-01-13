
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { CartComponent } from './cart.component';
import {AppState} from "../../app.state";
import {checkOut, removeItem, updateItemAmount} from "../cart.actions";


describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
	let store: MockStore;
	const initialState: Partial<AppState> = {
		cart: {
			'Coconut': 1
		}
	}

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers:[ provideMockStore({initialState})],
            declarations: [CartComponent]
        }).compileComponents();
		store = TestBed.inject(MockStore);
		jest.spyOn(store,'dispatch');
	});

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch removeItem action with the correct parameters', () => {
        const itemName: string = 'Coconut';

        component.removeItemFromCart(itemName);
		expect(store.dispatch).toHaveBeenCalledWith(removeItem({itemName}));
    });

    it('should call updateItemAmount with the correct parameters', () => {
        const itemName: string = 'Coconut';
        const newAmount: number = 4;

        component.updateItemAmount(itemName, newAmount);
        expect(store.dispatch).toHaveBeenCalledWith(updateItemAmount({itemName, amount:newAmount}));
    });

    it('should dispatch removeItem action with the correct parameters after not positive amount to update', () => {
        const itemName: string = 'Coconut';
        const newAmount: number = -1;
		component.updateItemAmount(itemName, newAmount);
		expect(store.dispatch).toHaveBeenCalledWith(removeItem({itemName}));
    });

    it('should dispatch checkOut action after checkout function been called', () => {
        component.checkOut();
		expect(store.dispatch).toHaveBeenCalledWith(checkOut());
    });
});
