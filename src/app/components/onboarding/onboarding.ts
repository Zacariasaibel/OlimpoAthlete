import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  imports: [FormsModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})

export class Onboarding {
  experience = '';
  trainingDays: number | null = null;
  duration = '';
  equipment = '';

  formMessage = '';
  planGenerated = false;
  exerciseStarted = false;
  completedReps: number | null = null;
  usedWeight: number | null = null;
  rir: number | null = null;
  feeling = '';

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

  startExercise() {
  this.exerciseStarted = true;
}
}