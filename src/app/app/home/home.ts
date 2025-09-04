// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLink } from '@angular/router';
// import { CartService } from '../../services/cart.service'; 
// import Swal from 'sweetalert2';
// import { FormsModule } from '@angular/forms';
// import { User as ProductService, Product, Category } from '../../services/user';

// @Component({
//   standalone: true,
//   selector: 'app-home',
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './home.html',
//   styleUrls: ['./home.css'],
// })
// export class HomeComponent implements OnInit {
//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   categories: Category[] = [];
  
//   loading: boolean = false;
//   error: string | null = null;

//   searchText: string = '';
//   selectedCategory: string = '';
//   minPrice: number | null = null;
//   maxPrice: number | null = null;

//   currentPage: number = 1;
//   pageSize: number = 12;
//   totalProducts: number = 0;

//   private productService = inject(ProductService);
//   private cartService = inject(CartService);
//   private router = inject(Router);

//   constructor() {}

//   ngOnInit() {
//     this.fetchProducts();
//     this.fetchCategories();
//   }

//   fetchProducts() {
//     this.loading = true;
//     this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
//       next: (data) => {
//         this.products = data.products; 
//         this.filteredProducts = [...this.products];
//         this.totalProducts = data.total;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = 'პროდუქტების ჩატვირთვისას მოხდა შეცდომა';
//         this.loading = false;
//       },
//     });
//   }

//   fetchCategories() {
//     this.productService.getCategories().subscribe({
//       next: (data) => { this.categories = data || []; },
//     });
//   }

//   filterProducts() { 
//     this.filteredProducts = this.products.filter((product) => {
//       const matchSearch = this.searchText
//         ? product.title.toLowerCase().includes(this.searchText.toLowerCase())
//         : true;
//       const matchCategory = this.selectedCategory
//         ? product.category === this.selectedCategory
//         : true;
//       const matchMinPrice =
//         this.minPrice !== null ? product.price.current >= this.minPrice : true;
//       const matchMaxPrice =
//         this.maxPrice !== null ? product.price.current <= this.maxPrice : true;

//       return matchSearch && matchCategory && matchMinPrice && matchMaxPrice;
//     });
//   }

//   clearFilters() {
//     this.searchText = '';
//     this.minPrice = null;
//     this.maxPrice = null;
//     this.selectedCategory = '';
//     this.filteredProducts = [...this.products];
//   }

//   goToDetails(id: string) {
//     this.router.navigate(['/details', id]);
//   }

//   onPageChange(page: number) {
//     if (page > 0 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.fetchProducts();
//     }
//   }

//   get totalPages(): number {
//     return Math.ceil(this.totalProducts / this.pageSize);
//   }

//   addToCart(product: Product, event: Event) {
//     event.stopPropagation();

//     if (product.stock <= 0) {
//       Swal.fire({
//         title: 'მარაგში არ არის',
//         text: 'სამწუხაროდ, ეს პროდუქტი გაყიდულია.',
//         icon: 'warning',
//       });
//       return;
//     }

//     // --- ვიყენებთ ახალ, გაერთიანებულ მეთოდს ---
//     this.cartService.upsertProduct(product._id, 1).subscribe({
//       next: () => {
//         Swal.fire({
//           title: 'წარმატება!',
//           text: `"${product.title}" დაემატა კალათაში.`,
//           icon: 'success',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       },
//       error: (err) => {
//         if (err.status === 400) {
//           Swal.fire({
//             title: 'შეცდომა',
//             text: 'მოთხოვნა ვერ დამუშავდა. შესაძლოა პროდუქტი მარაგში აღარ არის.',
//             icon: 'warning',
//           });
//         } else {
//           Swal.fire({
//             title: 'ავტორიზაცია საჭირო',
//             text: 'პროდუქტის დასამატებლად გთხოვთ გაიაროთ ავტორიზაცია.',
//             icon: 'error',
//           });
//         }
//       },
//     });
//   }
// }



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
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  
  loading: boolean = false;
  error: string | null = null;

  searchText: string = '';
  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  
  currentPage: number = 1;
  pageSize: number = 12;
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
        this.products = data.products; 
        this.filteredProducts = [...this.products];
        this.totalProducts = data.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'პროდუქტების ჩატვირთვისას მოხდა შეცდომა';
        this.loading = false;
      },
    });
  }

  fetchCategories() {
    this.productService.getCategories().subscribe({
      next: (data) => { this.categories = data || []; },
    });
  }

  filterProducts() { 
    this.filteredProducts = this.products.filter((product) => {
      const matchSearch = this.searchText
        ? product.title.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      const matchCategory = this.selectedCategory
        ? product.category === this.selectedCategory
        : true;
      const matchMinPrice =
        this.minPrice !== null ? product.price.current >= this.minPrice : true;
      const matchMaxPrice =
        this.maxPrice !== null ? product.price.current <= this.maxPrice : true;

      return matchSearch && matchCategory && matchMinPrice && matchMaxPrice;
    });
  }

  clearFilters() {
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedCategory = '';
    this.filteredProducts = [...this.products];
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();

    if (product.stock <= 0) {
      Swal.fire({
        title: 'მარაგში არ არის',
        text: 'სამწუხაროდ, ეს პროდუქტი გაყიდულია.',
        icon: 'warning',
      });
      return;
    };

    

    this.cartService.addProduct(product._id, 1).subscribe({
      next: () => {
        Swal.fire({
          title: 'წარმატება!',
          text: `"${product.title}" დაემატა კალათაში.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        if (err.status === 400) {
          Swal.fire({
            title: 'შეცდომა',
            text: 'მოთხოვნა ვერ დამუშავდა. შესაძლოა პროდუქტი მარაგში აღარ არის.',
            icon: 'warning',
          });
        } else {
          Swal.fire({
            title: 'ავტორიზაცია საჭირო',
            text: 'პროდუქტის დასამატებლად გთხოვთ გაიაროთ ავტორიზაცია.',
            icon: 'error',
          });
      }
      },
    });
  }
}