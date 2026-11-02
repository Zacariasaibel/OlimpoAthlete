import { TestBed } from '@angular/core/testing';
import { Onboarding } from './onboarding';

describe('Training plans', () => {
  let component: Onboarding;
  beforeEach(() => {
    component = TestBed.createComponent(Onboarding).componentInstance;
    component.selectedCoach = 'Ares'; component.experience = 'beginner';
    component.trainingDays = 3; component.duration = '45'; component.equipment = 'gym';
  });

  it('builds the selected number of days for every equipment type', () => {
    for (const equipment of ['gym', 'home', 'bodyweight']) {
      component.equipment = equipment;
      for (const days of [1, 2, 3, 4, 5]) {
        component.trainingDays = days;
        component.generatePlan();
        expect(component.planGenerated).toBe(true);
        expect(component.trainingPlan).toHaveLength(days);
        expect(component.trainingPlan.every(day => day.exercises.length === 5)).toBe(true);
      }
    }
  });

  it('rejects fractional and out-of-range training days', () => {
    for (const days of [1.5, 0, 6, NaN]) {
      component.trainingDays = days; component.generatePlan();
      expect(component.planGenerated).toBe(false);
    }
  });

  it('changes equipment exercises and coach repetition ranges', () => {
    component.generatePlan();
    expect(component.trainingPlan[0].exercises[0].name).toBe('Back Squat');
    expect(component.trainingPlan[0].exercises[0].reps).toBe('4-6');
    component.equipment = 'home'; component.selectedCoach = 'Hercules'; component.generatePlan();
    expect(component.trainingPlan[0].exercises[0].name).toBe('Goblet Squat');
    expect(component.trainingPlan[0].exercises[0].reps).toBe('6-10');
    component.equipment = 'bodyweight'; component.selectedCoach = 'Athena'; component.generatePlan();
    expect(component.trainingPlan[0].exercises[0].name).toBe('Bodyweight Squat');
    expect(component.trainingPlan[0].exercises[0].reps).toBe('6-8');
  });
});
