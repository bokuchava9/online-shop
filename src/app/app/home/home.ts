import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; 
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { User as ProductService, Product, Category } from '../../services/user';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  brands: string[] = [
    'asus', 'samsung', 'xiaomi', 'apple', 'honor', 'oneplus',
    'lenovo', 'hp', 'acer', 'dell', 'msi', 'lg',
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
  totalProducts: number = 0;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.loading = true;
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products.map(p => ({ ...p, id: p._id }));
        this.filteredProducts = [...this.products];
        this.loading = false;
        this.totalProducts = data.total;
      },
      error: (err) => {
        this.error = 'Error fetching products';
        this.loading = false;
        console.error('Error fetching products:', err);
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  fetchCategories() {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchSearch = this.searchText
        ? product.title.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      const matchCategory = this.selectedCategory
        ? product.category.id === this.selectedCategory
        : true;
      const matchBrand = this.selectedBrand
        ? product.brand?.toLowerCase() === this.selectedBrand.toLowerCase()
        : true;
      const matchMinPrice =
        this.minPrice !== null ? product.price.current >= this.minPrice : true;
      const matchMaxPrice =
        this.maxPrice !== null ? product.price.current <= this.maxPrice : true;
      const matchRating =
        this.minRating !== null ? product.rating >= this.minRating : true;

      return (
        matchSearch &&
        matchCategory &&
        matchBrand &&
        matchMinPrice &&
        matchMaxPrice &&
        matchRating
      );
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  getDiscountedPrice(price: any): string {
    return price && price.current
      ? `${price.current} ${price.currency || ''}`
      : '';
  }

  getOriginalPrice(price: any): string {
    return price && price.beforeDiscount
      ? `${price.beforeDiscount} ${price.currency || ''}`
      : '';
  }

  // addToCart(productId: string, event: Event) {
  //   event.stopPropagation();
  //   this.cartService.addToCart(productId).subscribe({
  //     next: () => {
  //       Swal.fire({
  //         title: 'წარმატება!',
  //         text: 'პროდუქტი დაემატა კალათაში.',
  //         icon: 'success',
  //         timer: 1500,
  //         showConfirmButton: false,
  //       });
  //     },
  //     error: (err) => {
  //       Swal.fire({
  //         title: 'შეცდომა!',
  //         text: 'პროდუქტის დასამატებლად გთხოვთ გაიაროთ ავტორიზაცია.',
  //         icon: 'error',
  //       });
  //       console.error('Add to cart error:', err);
  //     },
  //   });
  // }
addToCart(product: Product, event: Event) { 
    event.stopPropagation();
    this.cartService.addToCart(product); 
    Swal.fire({
      title: 'წარმატება!',
      text: 'პროდუქტი დაემატა კალათაში.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }
  clearFilters() {
    this.searchText = '';
    this.selectedBrand = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedCategory = '';
    this.filterProducts();
  }
}


