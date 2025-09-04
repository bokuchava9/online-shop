import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// HomeComponent-ის იმპორტი აქ აღარ არის საჭირო
// import { HomeComponent } from './app/home/home'; 
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, // <-- დაამატეთ ეს ხაზი
  // HomeComponent-ს ვშლით იმპორტებიდან
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-shop');
}