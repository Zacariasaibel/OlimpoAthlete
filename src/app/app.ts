// Herramienta principal para crear componentes Angular
import { Component } from '@angular/core';

// Componentes de nuestra aplicación
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Programs } from './components/programs/programs';
import { Membership } from './components/membership/membership';
import { Trainers } from './components/trainers/trainers';
import { Onboarding } from './components/onboarding/onboarding';
import { Auth } from './components/auth/auth';


@Component({
  // Nombre del componente principal
  selector: 'app-root',

  // Componentes que App puede utilizar
  imports: [
    Navbar,
    Hero,
    Programs,
    Membership,
    Trainers,
    Onboarding,
    Auth
  ],

  // HTML y CSS de App
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  // false = Login oculto / true = Login visible
  showAuth = false;

  // false = Profile oculto / true = Profile visible
  showOnboarding = false;

  // Mensaje de acceso correcto
  authMessage = '';

  // Abre Login/Register
  openAuth() {
    this.showAuth = true;
    this.showOnboarding = false;
  }

  // Se ejecuta cuando Login/Register es correcto
  handleAuthSuccess() {
  
    // Oculta Login/Register
    this.showAuth = false;
    // Muestra Create Profile
    this.showOnboarding = true;
    this.authMessage = 'Access successful.';
  }
}