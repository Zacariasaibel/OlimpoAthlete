import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Programs } from './components/programs/programs';
import { Membership } from './components/membership/membership';
import { Trainers } from './components/trainers/trainers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, Programs, Membership, Trainers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('olimpo-athlete');
}
