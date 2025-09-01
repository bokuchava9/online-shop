// import { Injectable, OnDestroy } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';

// export interface User {
//   id?: number;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phoneNumber: string;
//   token?: string;
// }

// export interface UserDTO {
//   phoneNumber: string;
//   password?: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService implements OnDestroy {
//   private apiUrl = 'https://rentcar.stepprojects.ge/api/Users';
//   private currentUserSubject: BehaviorSubject<User | null>;
//   public currentUser: Observable<User | null>;

//   constructor(private http: HttpClient, private router: Router) {
//     const userJson = localStorage.getItem('currentUser');
//     this.currentUserSubject = new BehaviorSubject<User | null>(
//       userJson ? JSON.parse(userJson) : null
//     );
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   login(userDto: Pick<UserDTO, 'phoneNumber' | 'password'>): Observable<any> {
//     // --- აქ არის მთავარი შესწორება ---
//     // API-დან მოსული პასუხის ტიპს ვცვლით, რადგან ის არ შეიცავს 'user' ველს
//     return this.http.post<any>(`${this.apiUrl}/login`, userDto).pipe(
//       tap((response: { token: string; [key: string]: any }) => {
//         // ვქმნით user ობიექტს API-დან მოსული ყველა ველით
//         const user: User = {
//           ...response, // ვიღებთ ყველა თვისებას (id, firstName, lastName...)
//           phoneNumber: userDto.phoneNumber, // ვამატებთ ტელეფონის ნომერს
//           token: response.token, // ვამატებთ ტოკენს
//         };

//         // ვინახავთ სრულ user ობიექტს
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         this.currentUserSubject.next(user);
//       })
//     );
//   }

//   register(userDto: UserDTO): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userDto);
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/sign-in']);
//   }

//   ngOnDestroy(): void {
//     this.currentUserSubject.complete();
//   }
// }



// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Router } from '@angular/router';

// export interface User {
//   email: string;
//   token: string;
//   firstName?: string;
//   lastName?: string;
//   phoneNumber?: string;
// }

// export interface UserDTO {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   password?: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<User | null>;
//   public currentUser: Observable<User | null>;

//   constructor(private router: Router) {
//     const userJson = localStorage.getItem('currentUser');
//     this.currentUserSubject = new BehaviorSubject<User | null>(
//       userJson ? JSON.parse(userJson) : null
//     );
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   register(userDto: UserDTO): Observable<any> {
//     localStorage.setItem('lastRegisteredUser', JSON.stringify(userDto));
//     return of({ success: true });
//   }

//   login(userDto: { email: string; password?: string }): Observable<any> {
//     const savedUserJson = localStorage.getItem('lastRegisteredUser');
//     let firstName = 'user'; 
//     let lastName = '';
//     let phoneNumber = '';

//     if (savedUserJson) {
//       const savedUser = JSON.parse(savedUserJson);
//       if (savedUser.email === userDto.email) {
//         firstName = savedUser.firstName;
//         lastName = savedUser.lastName;
//         phoneNumber = savedUser.phoneNumber;
//       }
//     }

//     const realUser: User = {
//       email: userDto.email,
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDUwMDFhYmY0YjA2Y2YxYjM4M2U3NSIsImZpcnN0TmFtZSI6Ikp1c3QiLCJsYXN0TmFtZSI6IlRlc3QiLCJlbWFpbCI6Imp1c3RAdGVzdC5jb20iLCJpYXQiOjE3MjUyMTAyNjYsImV4cCI6MTc1NjczNjY2Nn0.2Q4Y_3-Vb-g_a-h_J-k_L-m_N-o_P-q_R-s_T-u_V-w',
//       firstName: firstName,
//       lastName: lastName,
//       phoneNumber: phoneNumber,
//     };
//     localStorage.setItem('currentUser', JSON.stringify(realUser));
//     this.currentUserSubject.next(realUser);
//     return of(realUser);
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('lastRegisteredUser'); 
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/sign-in']);
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  email: string;
  token: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router) {
    const userJson = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      userJson ? JSON.parse(userJson) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(userDto: UserDTO): Observable<any> {
    // ვინახავთ რეგისტრირებულ მომხმარებელს
    localStorage.setItem('lastRegisteredUser', JSON.stringify(userDto));
    return of({ success: true });
  }

  login(userDto: { email: string; password?: string }): Observable<any> {
    const savedUserJson = localStorage.getItem('lastRegisteredUser');

    // თუ არავინ არაა რეგისტრირებული, ან მეილი არ ემთხვევა, ვაბრუნებთ შეცდომას
    if (!savedUserJson) {
      return throwError(() => new Error('მომხმარებელი ასეთი ელ.ფოსტით არ მოიძებნა.'));
    }

    const savedUser = JSON.parse(savedUserJson);

    if (savedUser.email !== userDto.email) {
      return throwError(() => new Error('ელ.ფოსტა ან პაროლი არასწორია.'));
    }

    // თუ ყველაფერი რიგზეა, ვქმნით მომხმარებელს რეალური მონაცემებით
    const realUser: User = {
      email: savedUser.email,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDUwMDFhYmY0YjA2Y2YxYjM4M2U3NSIsImZpcnN0TmFtZSI6Ikp1c3QiLCJsYXN0TmFtZSI6IlRlc3QiLCJlbWFpbCI6Imp1c3RAdGVzdC5jb20iLCJpYXQiOjE3MjUyMTAyNjYsImV4cCI6MTc1NjczNjY2Nn0.2Q4Y_3-Vb-g_a-h_J-k_L-m_N-o_P-q_R-s_T-u_V-w',
      firstName: savedUser.firstName, // <-- ვიღებთ შენახულ სახელს
      lastName: savedUser.lastName,   // <-- ვიღებთ შენახულ გვარს
      phoneNumber: savedUser.phoneNumber, // <-- ვიღებთ შენახულ ნომერს
    };

    localStorage.setItem('currentUser', JSON.stringify(realUser));
    this.currentUserSubject.next(realUser);
    return of(realUser);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastRegisteredUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/sign-in']);
  }
}