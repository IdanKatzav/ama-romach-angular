import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { CardsComponent } from './shop/cards/cards.component';

const routes: Routes = [
    { path: 'store', component: CardsComponent },
    { path: 'cart', component: CartComponent},
    {path: '', redirectTo: 'store', pathMatch: 'full' },
    {path: '**', component: CardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
