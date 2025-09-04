
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Product, Cart, CartItem } from './user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://api.everrest.educata.dev/shop/cart';

  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  public cartItemCount$: Observable<number> = this.cart$.pipe(
    map(cart => {
      if (!cart || !cart.products) return 0;
      return cart.products.reduce((sum, item) => sum + item.quantity, 0);
    })
  );

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart | null> {
    return this.http.get<Cart>(this.apiUrl).pipe(
      tap(cart => this.cartSubject.next(cart)),
      catchError(() => {
        this.cartSubject.next(null);
        return of(null);
      })
    );
  }

  addProduct(productId: string, quantity: number): Observable<Cart> {
    const url = `${this.apiUrl}/product`;
    const body = { id: productId, quantity };
    return this.http.patch<Cart>(url, body).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  updateProductQuantity(productId: string, quantity: number): Observable<Cart> {
    const url = `${this.apiUrl}/product`;
        const body = { id: productId, quantity };
    return this.http.patch<Cart>(url, body).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  removeProduct(productId: string): Observable<Cart> {
    const url = `${this.apiUrl}/product/${productId}`;
    return this.http.delete<Cart>(url).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  clearCart(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.cartSubject.next(null); 
      })
    );
  }
  public clearLocalCartState(): void {
    this.cartSubject.next(null);
  }
}