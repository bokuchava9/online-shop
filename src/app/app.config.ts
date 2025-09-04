// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';

// // --- ეს არის მთავარი ნაწილი ---
// import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient() // <-- დარწმუნდით, რომ ეს ხაზი არსებობს
//   ]
// };


import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // --- მთავარი შესწორება: ვარეგისტრირებთ HttpClient-ს და ინტერსეპტორს ---
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};