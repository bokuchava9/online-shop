import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

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
      age: [null, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+995\d{9}$/)]],
      zipcode: ['', Validators.required],
      avatar: ['https://www.gravatar.com/avatar/?d=mp', Validators.required],
      gender: ['MALE', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire('წარმატება!', 'თქვენ წარმატებით დარეგისტრირდით.', 'success');
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        this.loading = false;
        const errorKeys = err.error?.errorKeys;
        let errorMessage = 'რეგისტრაციისას მოხდა შეცდომა. გთხოვთ, სცადოთ თავიდან.';

        if (errorKeys && Array.isArray(errorKeys) && errorKeys.length > 0) {
          const formattedErrors = errorKeys.map(key => {
            switch (key) {
              case 'errors.invalid_email':
                return 'ელ. ფოსტა უკვე გამოყენებულია ან არასწორია.';
              case 'errors.invalid_phone_number':
                return 'ტელეფონის ნომერი უკვე გამოყენებულია ან არასწორია (ფორმატი: +995xxxxxxxxx).';
              case 'errors.invalid_avatar':
                return 'ავატარის URL არასწორია.';
              default:
                return key.replace('errors.', '');
            }
          }).join('\n');
          errorMessage = `გთხოვთ, შეამოწმოთ შემდეგი ველები:\n\n${formattedErrors}`;
        }
        
        Swal.fire({
          title: 'შეცდომა!',
          text: errorMessage,
          icon: 'error',
          customClass: {
            container: 'word-break-alert'
          }
        });
        console.error('Registration error:', err);
      },
    });
  }
}