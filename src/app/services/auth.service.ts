import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  gender?: string;
  age?: number;
  address?: string;
  phone?: string;
  zipcode?: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.everrest.educata.dev/auth';
  
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  private logoutSubject = new Subject<void>();
  public logout$ = this.logoutSubject.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign_up`, userData);
  }

  login(credentials: { email: string; password?: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/sign_in`, credentials).pipe(
      tap((response) => {
        if (!response || !response.access_token) {
          console.error('[AuthService] შეცდომა: access_token არ მოიძებნა პასუხში!');
          return;
        }
        
        const userPayload = this.decodeToken(response.access_token);
        
        if (userPayload) {
          const user: User = {
            _id: userPayload.sub,
            email: userPayload.email,
            firstName: userPayload.firstName,
            lastName: userPayload.lastName,
            role: userPayload.role,
            avatar: userPayload.avatar,
            gender: userPayload.gender,
            phone: userPayload.phone,
            address: userPayload.address,
            age: userPayload.age,
            zipcode: userPayload.zipcode
          };
          
          this.setSession(user, response.access_token, response.refresh_token);
        } else {
          console.error('[AuthService] კრიტიკული შეცდომა: ტოკენის გაშიფვრა ვერ მოხერხდა!');
        }
      })
    );
  }

  logout(): void {
    this.clearSession();
    this.http.post(`${this.apiUrl}/sign_out`, {}).subscribe();
  }

  private setSession(user: User, accessToken: string, refreshToken: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    this.userSubject.next(user);
  }

  private clearSession(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userSubject.next(null);
    this.logoutSubject.next(); 
    this.router.navigate(['/']);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson || userJson === 'undefined') return null;
    try {
      return JSON.parse(userJson);
    } catch (e) { return null; }
  }

  private decodeToken(token: string): any {
    try {
      let payload = token.split('.')[1];
      if (!payload) return null;

      payload = payload.replace(/-/g, '+').replace(/_/g, '/');
      
      const pad = payload.length % 4;
      if (pad) {
        if (pad === 1) throw new Error('Invalid base64 payload');
        payload += new Array(5 - pad).join('=');
      }

      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) { 
      console.error('[AuthService] decodeToken კრიტიკული შეცდომა:', e);
      return null; 
    }
  }

  public get isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  public get token(): string | null {
    return localStorage.getItem('access_token');
  }
}

// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
// import { Router } from '@angular/router';

// export interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   avatar?: string;
//   gender?: string;
//   age?: number;
//   address?: string;
//   phone?: string;
//   zipcode?: string;
// }

// interface LoginResponse {
//   access_token: string;
//   refresh_token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://api.everrest.educata.dev/auth';
  
//   private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
//   public user$ = this.userSubject.asObservable();

//   private logoutSubject = new Subject<void>();
//   public logout$ = this.logoutSubject.asObservable();

//   private http = inject(HttpClient);
//   private router = inject(Router);

//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/sign_up`, userData);
//   }

//   // --- მთავარი შესწორება: ვაბრუნებთ tap ოპერატორს ტოკენის შესანახად ---
//   login(credentials: { email: string; password?: string }): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/sign_in`, credentials).pipe(
//       tap((response) => {
//         const userPayload = this.decodeToken(response.access_token);
//         if (userPayload) {
//           const user: User = {
//             _id: userPayload.sub,
//             email: userPayload.email,
//             firstName: userPayload.firstName,
//             lastName: userPayload.lastName,
//             role: userPayload.role,
//             avatar: userPayload.avatar,
//             gender: userPayload.gender,
//             phone: userPayload.phone,
//             address: userPayload.address,
//             age: userPayload.age,
//             zipcode: userPayload.zipcode
//           };
//           this.setSession(user, response.access_token, response.refresh_token);
//         }
//       })
//     );
//   }

//   logout(): void {
//     this.clearSession();
//     this.http.post(`${this.apiUrl}/sign_out`, {}).subscribe();
//   }

//   private setSession(user: User, accessToken: string, refreshToken: string): void {
//     localStorage.setItem('user', JSON.stringify(user));
//     localStorage.setItem('access_token', accessToken);
//     localStorage.setItem('refresh_token', refreshToken);
//     this.userSubject.next(user);
//   }

//   private clearSession(): void {
//     localStorage.removeItem('user');
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     this.userSubject.next(null);
//     this.logoutSubject.next(); 
//     this.router.navigate(['/']);
//   }

//   private getUserFromStorage(): User | null {
//     const userJson = localStorage.getItem('user');
//     if (!userJson || userJson === 'undefined') return null;
//     try {
//       return JSON.parse(userJson);
//     } catch (e) { return null; }
//   }

//   private decodeToken(token: string): any {
//     try {
//       const payload = token.split('.')[1];
//       if (!payload) return null;
//       return JSON.parse(atob(payload));
//     } catch (e) { return null; }
//   }

//   public get isLoggedIn(): boolean {
//     return !!localStorage.getItem('access_token');
//   }

//   public get token(): string | null {
//     return localStorage.getItem('access_token');
//   }
// }