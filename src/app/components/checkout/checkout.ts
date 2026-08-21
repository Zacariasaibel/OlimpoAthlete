// Herramientas de Angular
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout {

  // Recibe el plan seleccionado
  @Input() planName = '';

  // Recibe el precio del plan
  @Input() planPrice = '';

  // Mensaje del pago
  paymentMessage = '';

  // Simula el pago
  completePayment() {
    this.paymentMessage =
      `Payment successful. Your ${this.planName} plan is now active.`;
  }
}