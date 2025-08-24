import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../services/user';

interface Price {
  current: number;
  currency: string;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: Price;
  category: Category;
  thumbnail: string;
  stock: number;
  rating: number;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details implements OnInit {
  product: Product | null = null;

  // ვარსკვლავების რეიტინგისთვის
  stars = [1, 2, 3, 4, 5];
  selectedRating = 0;
  hoveredRating = 0;

  constructor(private route: ActivatedRoute, private userService: User) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getProducts().subscribe({
        next: data => {
          this.product = data.products.find((p: any) => p._id === id) || null;
        },
        error: err => console.error('Failed to load products', err)
      });
    }
  }

  rateProduct(rating: number) {
  this.selectedRating = rating;

  if (this.product) {
    this.userService.addRating(this.product._id, rating).subscribe({
      next: () => console.log('✔ შეფასება გაიგზავნა'),
      error: (err) => console.error('❌ შეცდომა:', err)
    });
  }
}

  hoverRating(rating: number) {
    this.hoveredRating = rating;
  }

  resetHover() {
    this.hoveredRating = 0;
  }
}