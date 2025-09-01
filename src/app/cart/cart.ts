// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// // --- აქ არის შესწორება ---
// import { CartService } from '../services/cart.service';
// import { Observable } from 'rxjs';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './cart.html',
//   styleUrls: ['./cart.css']
// })
// export class CartComponent implements OnInit { // <-- კლასის სახელის გასწორება
// // ლოგიკები შესასწორებელია!!!
//   items$: Observable<any[]>;

//   constructor(private cartService: CartService) {
//     this.items$ = this.cartService.cart$;
//   }

//   ngOnInit() {}

//   increase(item: any) {
//     const newQuantity = Number(item.quantity) + 1;
//     this.cartService.updateQuantity(item.product._id, newQuantity).subscribe();
//   }

//   decrease(item: any) {
//     const newQuantity = Number(item.quantity) - 1;
//     if (newQuantity > 0) {
//       this.cartService.updateQuantity(item.product._id, newQuantity).subscribe();
//     } else {
//       this.remove(item);
//     }
//   }

//   remove(item: any) {
//     this.cartService.removeFromCart(item.product._id).subscribe();
//   }
// }

  
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CartService, CartItem } from '../services/cart.service';
// import { Observable } from 'rxjs';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './cart.html',
//   styleUrls: ['./cart.css']
// })
// export class CartComponent {
//   items$: Observable<CartItem[]>;

//   constructor(private cartService: CartService) {
//     this.items$ = this.cartService.cart$;
//   }



//   increase(item: CartItem) {
//     this.cartService.increaseQuantity(item.product._id);
//   }

//   decrease(item: CartItem) {
//     this.cartService.decreaseQuantity(item.product._id);
//   }

//   remove(item: CartItem) {
//     this.cartService.removeFromCart(item.product._id);
//   }
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- დავამატეთ იმპორტი
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  items$: Observable<CartItem[]>;
  totalPrice$: Observable<number>; 

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.cart$;
//jami
    
    this.totalPrice$ = this.items$.pipe(
      map(items =>
        items.reduce((acc, item) => acc + (item.product.price.current * item.quantity), 0)
      )
    );
  }

  increase(item: CartItem) {
    this.cartService.increaseQuantity(item.product._id);
  }

  decrease(item: CartItem) {
    this.cartService.decreaseQuantity(item.product._id);
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.product._id);
  }
}