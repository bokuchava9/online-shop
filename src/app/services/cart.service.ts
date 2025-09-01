// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, tap, switchMap, of } from 'rxjs';
// import { AuthService } from './auth.service'; // <--- დავამატოთ AuthService

// @Injectable({ providedIn: 'root' })
// export class CartService {
//   private cartApiUrl = 'https://api.everrest.educata.dev/shop/cart';
//   private cartItems$ = new BehaviorSubject<any[]>([]);
//   cart$ = this.cartItems$.asObservable();

//   constructor(private http: HttpClient, private authService: AuthService) {
//     // დავაკვირდეთ მომხმარებლის ცვლილებას და ჩავტვირთოთ კალათა
//     this.authService.currentUser.pipe(
//       switchMap(user => {
//         if (user) {
//           // თუ მომხმარებელი ავტორიზებულია, ჩატვირთე კალათა
//           return this.http.get<any[]>(this.cartApiUrl);
//         } else {
//           // თუ არა, დააბრუნე ცარიელი მასივი
//           return of([]);
//         }
//       })
//     ).subscribe(items => {
//       this.cartItems$.next(items);
//     });
//   }

//   private refreshCart() {
//     // მხოლოდ იმ შემთხვევაში განაახლე, თუ მომხმარებელი ავტორიზებულია
//     if (this.authService.currentUserValue) {
//       this.http.get<any[]>(this.cartApiUrl).subscribe(items => {
//         this.cartItems$.next(items);
//       });
//     }
//   }

//   addToCart(productId: string, quantity: number = 1) {
//     const body = { id: productId, quantity };
//     return this.http.post(`${this.cartApiUrl}/product`, body)
//       .pipe(tap(() => this.refreshCart()));
//   }

//   removeFromCart(productId: string) {
//     const body = { ids: [productId] }; // API-ს დოკუმენტაციის მიხედვით, ელოდება მასივს
//     return this.http.request('delete', `${this.cartApiUrl}/product`, { body })
//       .pipe(tap(() => this.refreshCart()));
//   }

//   updateQuantity(productId: string, quantity: number) {
//     const body = { id: productId, quantity };
//     // რაოდენობის განახლება ხდება PATCH მეთოდით
//     return this.http.patch(`${this.cartApiUrl}/product`, body)
//       .pipe(tap(() => this.refreshCart()));
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any; 
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems$.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('localCart');
    if (savedCart) {
      this.cartItems$.next(JSON.parse(savedCart));
    }
  }

  private saveCart(items: CartItem[]) {
    this.cartItems$.next(items);
    localStorage.setItem('localCart', JSON.stringify(items));
  }

  // პროდუქტის დამატება
  addToCart(product: any) {
    const currentItems = this.cartItems$.value;
    const existingItem = currentItems.find(item => item.product._id === product._id);

    if (existingItem) {
      // tu ukve kalatshia 
      existingItem.quantity += 1;
    } else {
      // tu axalia
      currentItems.push({ product: product, quantity: 1 });
    }
    this.saveCart(currentItems);
  }

  // რაოდენობის გაზრდა
  increaseQuantity(productId: string) {
    const currentItems = this.cartItems$.value;
    const item = currentItems.find(i => i.product._id === productId);
    if (item) {
      item.quantity++;
      this.saveCart(currentItems);
    }
  }

  // რაოდენობის შემცირება
  decreaseQuantity(productId: string) {
    let currentItems = this.cartItems$.value;
    const item = currentItems.find(i => i.product._id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      currentItems = currentItems.filter(i => i.product._id !== productId);
    }
    this.saveCart(currentItems);
  }

  removeFromCart(productId: string) {
    const updatedItems = this.cartItems$.value.filter(item => item.product._id !== productId);
    this.saveCart(updatedItems);
  }

  clearCart() {
    this.saveCart([]);
  }
}