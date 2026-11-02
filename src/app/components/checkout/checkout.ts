import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout {

  @Input() planName = '';

  @Input() planPrice = '';

  paymentMessage = '';

  completePayment() {
    this.paymentMessage =
      `Demo complete. Your ${this.planName} selection was simulated. No payment was processed.`;
  }
}