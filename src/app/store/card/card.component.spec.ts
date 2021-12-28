import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../models/product';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let mockProduct: Product = {
        name: "",
        description: "",
        image: "",
        price: 0
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        component.product = mockProduct;
        component.isProductInCart = false;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
