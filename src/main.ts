import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),        // HttpClient მუშაობისთვის
    provideRouter(routes),
           // Routing მუშაობისთვის
  ]
})
.catch(err => console.error(err))