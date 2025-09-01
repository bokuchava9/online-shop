// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   templateUrl: './sign-in.html',
//   styleUrls: ['./sign-in.css'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   loading = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.authService.currentUser.subscribe((user) => {
//       if (user) {
//         this.router.navigate(['/']);
//       }
//     });

//     // --- შესწორება: ფორმა უნდა შეიქმნას phoneNumber-ით ---
//     this.loginForm = this.formBuilder.group({
//       phoneNumber: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   get f() {
//     return this.loginForm.controls;
//   }

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       this.loginForm.markAllAsTouched();
//       return;
//     }

//     this.loading = true;

//     // --- შესწორება: სერვისს უნდა გადაეცეს phoneNumber ---
//     this.authService
//       .login({
//         phoneNumber: this.f['phoneNumber'].value,
//         password: this.f['password'].value,
//       })
//       .subscribe({
//         next: () => {
//           this.loading = false;
//           this.router.navigate(['/']);
//         },
//         error: (err: any) => {
//           this.loading = false;
//           Swal.fire({
//             title: 'შეცდომა!',
//             text:
//               err.error?.message ||
//               'ავტორიზაცია ვერ მოხერხდა. გთხოვთ, შეამოწმეთ მონაცემები.',
//             icon: 'error',
//           });
//           console.error('Login error', err);
//         },
//       });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './sign-in.html',
//   styleUrls: ['./sign-in.css'],
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   loading = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   get f() { return this.loginForm.controls; }

//   onSubmit(): void {
//     if (this.loginForm.invalid) {
//       this.loginForm.markAllAsTouched();
//       return;
//     }
//     this.loading = true;
//     this.authService.login(this.loginForm.value).subscribe({
//       next: () => {
//         this.loading = false;
//         this.router.navigate(['/']);
//       },
//       error: (err) => {
//         this.loading = false;
//         Swal.fire('შეცდომა!', err.error?.message || 'ავტორიზაცია ვერ მოხერხდა.', 'error');
//       },
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      
      error: (err) => {
        this.loading = false;
        const errorMessage = err.error?.message || err.error || 'ტელეფონის ნომერი ან პაროლი არასწორია.';
        Swal.fire('მონაცემები არასწორია!', errorMessage, 'error');
        console.error('Login error:', err);
      },
    });
  }
}