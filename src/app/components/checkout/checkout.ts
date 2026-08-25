import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout {

  // Recibe el plan seleccionado desde App
  @Input() planName = '';

  // Recibe el precio seleccionado desde App
  @Input() planPrice = '';

  paymentMessage = '';

  completePayment() {
    this.paymentMessage =
      `Payment successful. Your ${this.planName} plan is now active.`;
  }
}