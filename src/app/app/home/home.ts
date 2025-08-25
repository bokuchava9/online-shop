import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  brands: string[] = [
    "asus","samsung","xiaomi","apple","honor","oneplus",
    "lenovo","hp","acer","dell","msi","lg"
  ];

  loading: boolean = false;
  error: string | null = null;

  // ფილტრები
  searchText: string = '';
  selectedCategory: string = '';
  selectedBrand: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number | null = null;

  currentPage: number = 1;
  pageSize: number = 10;
  total: number = 0;
 totalProducts: number = 0;
  constructor(
    private userService: User,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.loading = true;
    this.userService.getProducts(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.products = data.products || [];
        this.filteredProducts = [...this.products];
        this.loading = false;
        this.totalProducts = data.total;
      },
      (err: any) => {
        this.error = 'Error fetching products';
        this.loading = false;
        console.error('Error fetching products:', err);
      }
    );
  }
   get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  fetchCategories() {
    this.userService.getCategories().subscribe(
      (data: any) => {
        this.categories = data || [];
      },
      (err: any) => console.error('Error fetching categories:', err)
    );
  }
//  პროდუქტების ფილტრი შესასწორებელია!!!!!
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchSearch = this.searchText
        ? product.title.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      const matchCategory = this.selectedCategory
        ? product.category.id === this.selectedCategory
        : true;
      const matchBrand = this.selectedBrand
        ? product.brand?.toLowerCase() === this.selectedBrand.toLowerCase()
        : true;
      const matchMinPrice = this.minPrice !== null
        ? product.price.current >= this.minPrice
        : true;
      const matchMaxPrice = this.maxPrice !== null
        ? product.price.current <= this.maxPrice
        : true;
      const matchRating = this.minRating !== null
        ? product.rating >= this.minRating
        : true;

      return matchSearch && matchCategory && matchBrand && matchMinPrice && matchMaxPrice && matchRating;
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
// გვერდების შეცვლა შესასწორებელია!!!
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  getDiscountedPrice(price: any): string {
    return price && price.current ? `${price.current} ${price.currency || ''}` : '';
  }

  getOriginalPrice(price: any): string {
    return price && price.beforeDiscount ? `${price.beforeDiscount} ${price.currency || ''}` : '';
  }
// კალათაში დამატება იუზერის დამატებას შესასწორებელია!!!
  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        Swal.fire({
          title: "წარმატება!",
          text: "პროდუქტი დაემატა კალათაში.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          title: "შეცდომა!",
          text: "პროდუქტის დასამატებლად გთხოვთ გაიაროთ ავტორიზაცია!!!",
          icon: "error"
        });
        console.error(err);
      }
    });
  };


  // 

  clearFilters() {
  this.searchText = '';
  this.selectedBrand = '';
  this.minPrice = null;
  this.maxPrice = null;
  this.selectedCategory = '';
  this.filterProducts();
}
}


