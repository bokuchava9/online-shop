import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Price {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string; 
  title: string;
  description: string;
  price: Price;
  category: Category;
  issueDate: string;
  thumbnail: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: string[];
}

export interface ProductResponse {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: Product[];
}

@Injectable({ providedIn: 'root' })
export class User {
  private apiUrl = 'https://api.everrest.educata.dev/shop';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, pageSize: number = 10): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${this.apiUrl}/products/all?page_index=${page}&page_size=${pageSize}`
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiUrl}/products/categories`
    );
  };

  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(
      `${this.apiUrl}/products/product/${id}`
    )
  };
 
  addRating(productId: string, rate: number): Observable<any> {
    const url = `${this.apiUrl}/reviews/add`;
    return this.http.post(url, { productId, rate });
  }
}