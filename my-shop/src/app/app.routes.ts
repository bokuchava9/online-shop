import { RouterModule, Routes } from '@angular/router';

import { Cart } from './cart/cart';
import { Details } from './details/details';
import { Home } from './app/home/home';
import { NgModule } from '@angular/core';

export const routes: Routes = [

    { path: '', component: Home },
    {
        path:"cart", component:Cart
    },

   { path: 'details/:id', component: Details }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}