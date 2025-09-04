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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    console.log('--- [LOGIN ATTEMPT] ---', this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('--- [LOGIN SUCCESS] სერვერიდან მოსული პასუხი:', response);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('--- [LOGIN FAILED] სერვერიდან მოსული შეცდომა:', err);
        this.loading = false;
        const errorMessage = err.error?.errorKeys?.includes('errors.incorrect_email_or_password')
          ? 'ელ. ფოსტა ან პაროლი არასწორია.'
          : 'ავტორიზაციისას მოხდა უცნობი შეცდომა.';
        
        Swal.fire('შეცდომა!', errorMessage, 'error');
      },
      complete: () => {
        console.log('--- [LOGIN COMPLETE] ---');
      }
    });
  }
}