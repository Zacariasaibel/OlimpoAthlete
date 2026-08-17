// Herramientas de Angular para crear el componente y enviar eventos
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})

export class Hero {
  // Envía un evento hacia App
  @Output() authRequested = new EventEmitter<void>();
  // Avisa a App para abrir Login/Register
  requestAuth() {
    this.authRequested.emit();
  }
}