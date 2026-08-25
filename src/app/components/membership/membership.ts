import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-membership',
  imports: [],
  templateUrl: './membership.html',
  styleUrl: './membership.css',
})

export class Membership {

  // Envía el plan seleccionado a App
  @Output() planSelected = new EventEmitter<{
    name: string;
    price: string;
  }>();

  choosePlan(name: string, price: string) {
    this.planSelected.emit({
      name: name,
      price: price
    });
  }
}