import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {

  @Output() authRequested = new EventEmitter<void>();

  requestAuth() {
    this.authRequested.emit();
  }

  @Output() homeRequested = new EventEmitter<void>();

  requestHome() {
    this.homeRequested.emit();
  }

  scrollTo(sectionId: string) {
    this.homeRequested.emit();
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}