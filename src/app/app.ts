import { Component } from '@angular/core';

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
  selector: 'app-root',
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
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  showAuth = false;
  showOnboarding = false;
  showCheckout = false;

  // Guarda si el usuario ha iniciado sesión
  isLoggedIn = false;

  // Guarda el plan seleccionado
  selectedPlanName = '';
  selectedPlanPrice = '';

  // Decide el destino después del Login
  checkoutAfterLogin = false;


  openAuth() {
    this.showAuth = true;
    this.showOnboarding = false;
    this.showCheckout = false;
    this.checkoutAfterLogin = false;
  }


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


  // Decide qué pantalla abrir después del Login
  handleAuthSuccess() {
    this.isLoggedIn = true;
    this.showAuth = false;

    if (this.checkoutAfterLogin) {
      this.showCheckout = true;
      this.showOnboarding = false;
    } else {
      this.showCheckout = false;
      this.showOnboarding = true;
    }
  }


  // Recibe el plan seleccionado desde Membership
  handlePlanSelected(plan: { name: string; price: string }) {
    this.selectedPlanName = plan.name;
    this.selectedPlanPrice = plan.price;

    // Warrior no necesita Checkout
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

    // Los planes de pago pasan por Checkout
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