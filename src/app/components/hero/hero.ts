// Herramientas de Angular para crear el componente y enviar eventos
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})

export class Hero {

  // Output = avisa al padre de que el usuario quiere entrar
  @Output() authRequested = new EventEmitter<void>();

  // Envía el evento al componente padre
  requestAuth() {
    this.authRequested.emit();
  }
}