// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // ავიღოთ მომხმარებლის ტოკენი AuthService-დან
//     const token = this.authService.currentUserValue?.token;

//     // შევამოწმოთ, გვაქვს თუ არა ტოკენი
//     if (token) {
//       // თუ გვაქვს, დავაკოპიროთ მიმდინარე მოთხოვნა
//       const cloned = req.clone({
//         // და დავამატოთ მას Authorization ჰედერი ტოკენის მნიშვნელობით
//         headers: req.headers.set('Authorization', `Bearer ${token}`),
//       });
//       // გავაგზავნოთ განახლებული (დაკოპირებული) მოთხოვნა
//       return next.handle(cloned);
//     }

//     // თუ ტოკენი არ გვაქვს, გავაგზავნოთ თავდაპირველი მოთხოვნა უცვლელად
//     return next.handle(req);
//   }
// }



import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.currentUserValue;

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}