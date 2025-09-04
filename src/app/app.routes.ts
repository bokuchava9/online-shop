// import { Routes } from '@angular/router';
// import { CartComponent } from './cart/cart';
// import { Details} from './details/details';
// import { HomeComponent } from './app/home/home';
// import { RegisterComponent } from './register/register';
// import { LoginComponent } from './sign-in/sign-in';
// import { ProfileComponent } from './profile/profile';

// export const routes: Routes = [
//     { path: '', component: HomeComponent },
//     { path: 'cart', component: CartComponent },
//   { path: 'details/:id', component: Details },
//   { path: 'register', component: RegisterComponent },
//   { path: 'sign-in', component: LoginComponent },
//   { path: 'profile', component: ProfileComponent }
// ]; 

import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home';
import { LoginComponent } from './sign-in/sign-in';
import { RegisterComponent } from './register/register';
import { Details } from './details/details';
import { CartComponent } from './cart/cart';
import { ProfileComponent } from './profile/profile';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sign-in', component: LoginComponent },
    { path: 'sign-up', component: RegisterComponent },
    { path: 'product/:id', component: Details },
    { path: 'cart', component: CartComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]; 