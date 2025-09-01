// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './register.html',
//   styleUrls: ['./register.css'],
// })
// export class RegisterComponent implements OnInit {
//   registerForm!: FormGroup;
//   loading = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.registerForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       age: [null, [Validators.required, Validators.min(18)]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       address: ['', Validators.required],
//       phone: ['', Validators.required],
//       zipcode: ['', Validators.required],
//       avatar: ['https://www.gravatar.com/avatar/?d=mp', Validators.required],
//       gender: ['MALE', Validators.required],
//     });
//   }

//   get f() { return this.registerForm.controls; }

//   onSubmit(): void {
//     if (this.registerForm.invalid) {
//       this.registerForm.markAllAsTouched();
//       Swal.fire('შეცდომა!', 'გთხოვთ, შეავსოთ ყველა სავალდებულო ველი.', 'warning');
//       return;
//     }
//     this.loading = true;
//     this.authService.register(this.registerForm.value).subscribe({
//       next: () => {
//         this.loading = false;
//         Swal.fire('წარმატება!', 'რეგისტრაცია წარმატებით დასრულდა.', 'success');
//         this.router.navigate(['/sign-in']);
//       },
//       error: (err) => {
//         this.loading = false;
//         Swal.fire('შეცდომა!', err.error?.message || 'რეგისტრაცია ვერ მოხერხდა.', 'error');
//         console.error('Registration Error:', err);
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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire('რეგისტრაცია წარმატებით დასრულდა. ახლა გაიარეთ ავტორიზაცია.', );
        this.router.navigate(['/sign-in']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        const errorMessage = Array.isArray(err.error)
          ? err.error.map((e: { description: string }) => e.description).join('\n')
          : (err.error?.message || 'ელფოსტა ან ტელეფონის ნომერი უკვე გამოყენებულია.');
        Swal.fire('შეცდომა!', errorMessage, 'error');
      },
    });
  }
}