import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit, OnDestroy {
  isLoggedIn = false;
  user: User | null = null;
  private userSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}
//თუ ავტორიზებულია
  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.user = user;
      
      this.isLoggedIn = !!user; 
    });
  }

  ngOnDestroy(): void {
    
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
