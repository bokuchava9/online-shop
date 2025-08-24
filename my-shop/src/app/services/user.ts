import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Price {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
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

interface ProductResponse {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: Product[];
}

@Injectable({ providedIn: 'root' })
export class User {
  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, pageSize: number = 10): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${pageSize}`
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `https://api.everrest.educata.dev/shop/products/categories`
    );
  };

  goToDetails(id:string):Observable<Product>{
    return this.http.get<Product>(
      "https://api.everrest.educata.dev/shop/products/details?id=" + id
    )

  };
 


// პროდუქტების შეფასება შესასწორებელია!!!!!
  addRating(productId: string, rate: number): Observable<any> {
    const url = 'https://api.everrest.educata.dev/shop/reviews/add';
    return this.http.post(url, { productId, rate });
  }
  
}