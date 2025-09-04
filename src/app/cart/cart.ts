// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { Observable } from 'rxjs';
// import Swal from 'sweetalert2';

// import { CartService } from '../services/cart.service';
// import { Cart, CartItem } from '../services/user'; 

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './cart.html',
//   styleUrls: ['./cart.css']
// })
// export class CartComponent implements OnInit {
//   cart$: Observable<Cart | null>;

//   private cartService = inject(CartService);

//   constructor() {
//     this.cart$ = this.cartService.cart$;
//   }

//   ngOnInit(): void {
//     this.cartService.getCart().subscribe({
//       error: (err) => {
//         console.error('Failed to load cart', err);
//         // არ ვაგდებთ ალერტს, თუ უბრალოდ ავტორიზებული არაა და კალათა არ აქვს
//         if (err.status !== 401) {
//           Swal.fire('შეცდომა', 'კალათის ჩატვირთვა ვერ მოხერხდა.', 'error');
//         }
//       }
//     });
//   }

//   decrease(item: CartItem): void {
//     const newQuantity = item.quantity - 1;
//     if (newQuantity > 0) {
//       // --- ვიყენებთ ახალ, გაერთიანებულ მეთოდს ---
//       this.cartService.upsertProduct(item.product._id, newQuantity).subscribe();
//     } else {
//       this.remove(item);
//     }
//   }

//   increase(item: CartItem): void {
//     const newQuantity = item.quantity + 1;
//     if (newQuantity > item.product.stock) {
//         Swal.fire('შეზღუდული მარაგი', `შეგიძლიათ დაამატოთ მაქსიმუმ ${item.product.stock} ერთეული.`, 'warning');
//         return;
//     }
//     // --- ვიყენებთ ახალ, გაერთიანებულ მეთოდს ---
//     this.cartService.upsertProduct(item.product._id, newQuantity).subscribe();
//   }

//   remove(item: CartItem): void {
//     this.cartService.removeProduct(item.product._id).subscribe();
//   }

//   clearCart(): void {
//     this.cartService.clearCart().subscribe({
//       next: () => {
//         Swal.fire('წარმატება', 'კალათა გასუფთავდა.', 'success');
//       },
//       error: (err) => {
//         Swal.fire('შეცდომა', 'კალათის გასუფთავება ვერ მოხერხდა.', 'error');
//       }
//     });
//   }
// }




import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { CartService } from '../services/cart.service';
import { Cart, CartItem } from '../services/user'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart | null>;

  private cartService = inject(CartService);

  constructor() {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      error: (err) => {
        console.error('Failed to load cart', err);
          Swal.fire('შეცდომა', 'კალათის ჩატვირთვა ვერ მოხერხდა.', 'error');
        }
    });
  }

  decrease(item: CartItem): void {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      this.cartService.updateProductQuantity(item.product._id, newQuantity).subscribe();
    } else {
      this.remove(item);
  }
  }

  increase(item: CartItem): void {
    const newQuantity = item.quantity + 1;
    if (newQuantity > item.product.stock) {
        Swal.fire('შეზღუდული მარაგი', `შეგიძლიათ დაამატოთ მაქსიმუმ ${item.product.stock} ერთეული.`, 'warning');
      return;
    }
    this.cartService.updateProductQuantity(item.product._id, newQuantity).subscribe();
  }

  remove(item: CartItem): void {
    this.cartService.removeProduct(item.product._id).subscribe();
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        Swal.fire('წარმატება', 'კალათა გასუფთავდა.', 'success');
      },
      error: (err) => {
        Swal.fire('შეცდომა', 'კალათის გასუფთავება ვერ მოხერხდა.', 'error');
      }
    });
  }
}