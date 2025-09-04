// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService, User } from '../services/auth.service';
// import { CartService } from '../services/cart.service';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './header.html',
//   styleUrls: ['./header.css'],
// })
// export class HeaderComponent {
//   currentUser$: Observable<User | null>;
//   cartItemCount$: Observable<number>;

//   constructor(
//     private authService: AuthService,
//     private cartService: CartService
//   ) {
//     this.currentUser$ = this.authService.currentUser;
//     this.cartItemCount$ = this.cartService.cartItemCount$;
//   }

//   logout(): void {
//     this.authService.logout();
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, User } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  currentUser$: Observable<User | null>;
  cartItemCount$: Observable<number>;

  constructor(
    private authService: AuthService,
    private cartService: CartService, 
    private router: Router
  ) {
    this.currentUser$ = this.authService.user$;
    this.cartItemCount$ = this.cartService.cartItemCount$;
  }

  logout() {
    this.authService.logout();
  }
}