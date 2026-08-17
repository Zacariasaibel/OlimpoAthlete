// Herramientas de Angular para crear el componente y enviar eventos
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {

  // Output = envía un evento desde Navbar hacia su componente padre
  @Output() authRequested = new EventEmitter<void>();

  // Avisa al padre de que el usuario quiere entrar/registrarse
  requestAuth() {
    this.authRequested.emit();
  }
}