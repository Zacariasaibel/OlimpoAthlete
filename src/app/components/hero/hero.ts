import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})

export class Hero {

  // Avisa a App para abrir Login/Register
  @Output() authRequested = new EventEmitter<void>();

  requestAuth() {
    this.authRequested.emit();
  }
}