import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore} from "@ngrx/store/testing";
import { CardComponent } from '../card/card.component';
import { CardsComponent } from './cards.component';
import {AppState} from "../../app.state";
import {addItem} from "../../cart/cart.actions";

describe('CardsComponent', () => {
    let component: CardsComponent;
    let fixture: ComponentFixture<CardsComponent>;
	let store: MockStore;
	let initialState: Partial<AppState> = {
		cart: {
		}
	};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                CardsComponent,
                CardComponent
            ],
			providers: [provideMockStore({initialState})]
        }).compileComponents();
		store = TestBed.inject(MockStore);
		jest.spyOn(store,'dispatch');
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

	it('should dispatch addItem action after addItem function was called', () => {
		const productName: string = 'Coconut';

		component.addToCart(productName);
		expect(store.dispatch).toHaveBeenCalledWith(addItem({ productName }));
	});
});
