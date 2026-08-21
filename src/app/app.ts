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
import { HowItWorks } from './components/how-it-works/how-it-works';
import { Checkout } from './components/checkout/checkout';


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
    Auth,
    HowItWorks,
    Checkout
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

  // false = Checkout oculto / true = Checkout visible
  showCheckout = false;

  // Guarda si el usuario ha iniciado sesión
  isLoggedIn = false;

  // Guarda el plan seleccionado
  selectedPlanName = '';
  selectedPlanPrice = '';

  // Decide si después del Login abre Checkout
  checkoutAfterLogin = false;


  // Abre Login/Register
  openAuth() {
    this.showAuth = true;
    this.showOnboarding = false;
    this.showCheckout = false;
    this.checkoutAfterLogin = false;
  }


  // Vuelve a la Landing Page
  goHome() {
    this.showAuth = false;
    this.showOnboarding = false;
    this.showCheckout = false;
    this.checkoutAfterLogin = false;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  // Se ejecuta cuando Login/Register es correcto
  handleAuthSuccess() {

    // Guarda el estado del login
    this.isLoggedIn = true;

    // Oculta Login/Register
    this.showAuth = false;

    // Abre Checkout si eligió un plan de pago
    if (this.checkoutAfterLogin) {
      this.showCheckout = true;
      this.showOnboarding = false;
    } else {

      // Muestra Coach/Profile
      this.showCheckout = false;
      this.showOnboarding = true;
    }
  }


  // Recibe el plan seleccionado
  handlePlanSelected(plan: { name: string; price: string }) {

    // Guarda el plan
    this.selectedPlanName = plan.name;
    this.selectedPlanPrice = plan.price;

    // Plan gratuito
    if (plan.name === 'Warrior') {

      this.checkoutAfterLogin = false;

      if (this.isLoggedIn) {
        this.showAuth = false;
        this.showCheckout = false;
        this.showOnboarding = true;
      } else {
        this.showAuth = true;
        this.showCheckout = false;
        this.showOnboarding = false;
      }

      return;
    }


    // Plan de pago
    this.checkoutAfterLogin = true;

    if (this.isLoggedIn) {
      this.showAuth = false;
      this.showOnboarding = false;
      this.showCheckout = true;
    } else {
      this.showAuth = true;
      this.showOnboarding = false;
      this.showCheckout = false;
    }
  }
}