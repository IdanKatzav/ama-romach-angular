import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    CardsComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardsComponent
  ]
})
export class ShopModule { }
