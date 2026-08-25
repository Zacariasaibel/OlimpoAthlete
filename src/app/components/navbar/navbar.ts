import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {

  // Avisa a App para abrir Login/Register
  @Output() authRequested = new EventEmitter<void>();

  requestAuth() {
    this.authRequested.emit();
  }

  // Avisa a App para volver al inicio
  @Output() homeRequested = new EventEmitter<void>();

  requestHome() {
    this.homeRequested.emit();
  }

  scrollTo(sectionId: string) {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}