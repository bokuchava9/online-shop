// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import Swal from 'sweetalert2';

// import { User as ProductService, Product } from '../services/user';
// import { CartService } from '../services/cart.service';

// @Component({
//   selector: 'app-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './details.html',
//   styleUrls: ['./details.css']
// })
// export class Details implements OnInit {
//   product: Product | null = null;
//   loading: boolean = true;

//   stars = [1, 2, 3, 4, 5];
//   selectedRating = 0;
//   hoveredRating = 0;

//   private route = inject(ActivatedRoute);
//   private productService = inject(ProductService);
//   private cartService = inject(CartService);

//   constructor() {}

//   ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.productService.getProductById(id).subscribe({
//         next: data => {
//           this.product = data;
//           this.loading = false;
//         },
//         error: err => {
//           console.error('Failed to load product', err);
//           this.loading = false;
//         }
//       });
//     }
//   }

//   addToCart(product: Product) {
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

//   rateProduct(rating: number) {
//     this.selectedRating = rating;
//     if (this.product) {
//       this.productService.addRating(this.product._id, rating).subscribe({
//         next: () => {
//           Swal.fire('გმადლობთ!', 'თქვენი შეფასება მიღებულია.', 'success');
//           if (this.product) {
//             // ეს მიახლოებითი განახლებაა, იდეალურ შემთხვევაში სერვერიდან უნდა მოდიოდეს განახლებული ობიექტი
//             this.product.rating = (this.product.rating + rating) / 2; 
//           }
//         },
//         error: (err) => {
//           Swal.fire('შეცდომა', 'შეფასების დასაფიქსირებლად გთხოვთ გაიაროთ ავტორიზაცია.', 'error');
//         }
//       });
//     }
//   }

//   hoverRating(rating: number) {
//     this.hoveredRating = rating;
//   }

//   resetHover() {
//     this.hoveredRating = 0;
//   }
// }



import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { User as ProductService, Product } from '../services/user';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details implements OnInit { 
  product: Product | null = null;
  loading: boolean = true;

  stars = [1, 2, 3, 4, 5];
  selectedRating = 0;
  hoveredRating = 0;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  constructor() {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: data => {
          this.product = data;
          this.loading = false;
        },
        error: err => {
          console.error('Failed to load product', err);
          this.loading = false;
        }
      });
    }
  }

  addToCart(product: Product) {
    if (product.stock <= 0) {
      Swal.fire({
        title: 'მარაგში არ არის',
        text: 'სამწუხაროდ, ეს პროდუქტი გაყიდულია.',
        icon: 'warning',
      });
      return;
    }

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

  rateProduct(rating: number) {
        this.selectedRating = rating;
    if (this.product) {
      this.productService.addRating(this.product._id, rating).subscribe({
        next: () => {
          Swal.fire('გმადლობთ!', 'თქვენი შეფასება მიღებულია.', 'success');
          if (this.product) {
            this.product.rating = (this.product.rating + rating) / 2; 
          }
      },
        error: (err) => {
          Swal.fire('შეცდომა', 'შეფასების დასაფიქსირებლად გთხოვთ გაიაროთ ავტორიზაცია.', 'error');
        }
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