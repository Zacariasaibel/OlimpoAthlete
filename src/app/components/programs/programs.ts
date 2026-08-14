import { Component } from '@angular/core';

@Component({
  selector: 'app-programs',
  imports: [],
  templateUrl: './programs.html',
  styleUrl: './programs.css',
})
export class Programs {
  selectedGoal = '';

  selectGoal(goal: string) {
    this.selectedGoal = goal;
  }
}
