import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  imports: [FormsModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})

export class Onboarding {

  // Datos del perfil
  experience = '';
  trainingDays: number | null = null;
  duration = '';
  equipment = '';

  // Mensaje del formulario
  formMessage = '';

  // Muestra el plan generado
  planGenerated = false;


  // Comprueba el formulario
  generatePlan() {

    if (
      this.experience &&
      this.trainingDays &&
      this.duration &&
      this.equipment
    ) {

      this.formMessage =
        'Profile complete. Your training plan is ready.';

      this.planGenerated = true;

    } else {

      this.formMessage = 'Please complete all fields.';
      this.planGenerated = false;
    }
  }
}