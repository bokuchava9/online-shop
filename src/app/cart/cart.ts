import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
// ლოგიკები შესასწორებელია!!!
  items$: Observable<any[]>;

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.cart$;
  }

  ngOnInit() {}

  increase(item: any) {
    const newQuantity = Number(item.quantity) + 1;
    this.cartService.updateQuantity(item.product._id, newQuantity).subscribe();
  }

  decrease(item: any) {
    const newQuantity = Number(item.quantity) - 1;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.product._id, newQuantity).subscribe();
    } else {
      
      this.remove(item);
    }
  }

  remove(item: any) {
    this.cartService.removeFromCart(item.product._id).subscribe();
  }
  
}

  
