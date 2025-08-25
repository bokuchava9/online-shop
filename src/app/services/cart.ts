import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  // BehaviorSubject კალათის მდგომარეობის შესანახად
  private cartItems$ = new BehaviorSubject<any[]>([]);
  
  cart$ = this.cartItems$.asObservable();

  constructor(private http: HttpClient) {
  //  კალათის ჩატვირთვა
    this.loadInitialCart();
  }
// ლინკი შესასწორებელია!!!
  private loadInitialCart() {
    this.http.get<any[]>('https://api.everrest.educata.dev/shop/cart').subscribe(items => {
      this.cartItems$.next(items);
    });
  }

  // კალათის განახლების მეთოდი
  private refreshCart() {
    this.loadInitialCart();
  }
// არ მუშაობს შესასწორებელია!!!
  addToCart(product: any, quantity: number = 1) {
    const body = { id: product._id, quantity };
    return this.http.post('https://api.everrest.educata.dev/shop/cart/product', body)
      .pipe(tap(() => this.refreshCart())); // ოპერაციის შემდეგ განაახლე კალათა
  }

  getItems() {
    return this.http.get<any[]>('https://api.everrest.educata.dev/shop/cart');
  }

  removeFromCart(productId: string) {
    const body = { id: productId };
    return this.http.request('delete', 'https://api.everrest.educata.dev/shop/cart/product', { body })
      .pipe(tap(() => this.refreshCart()));
  }

  updateQuantity(productId: string, quantity: number) {
    const body = { id: productId, quantity };
    return this.http.post('https://api.everrest.educata.dev/shop/cart/product', body)
      .pipe(tap(() => this.refreshCart()));
  }
}