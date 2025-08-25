import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './app/home/home';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-shop');
}
