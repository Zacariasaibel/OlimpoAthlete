import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  imports: [FormsModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})

export class Onboarding {

  // Coach seleccionado
  selectedCoach = '';

  // Datos del perfil
  experience = '';
  trainingDays: number | null = null;
  duration = '';
  equipment = '';

  // Mensaje del formulario
  formMessage = '';

  // Muestra el plan generado
  planGenerated = false;

  // Guarda la rutina generada
  trainingPlan: {
    name: string;
    exercises: {
      name: string;
      sets: number;
      reps: string;
      rest: string;
      instructions: string;
    }[];
  }[] = [];


  // Biblioteca de ejercicios
  exerciseLibrary: Record<string, Record<string, { name: string; main: boolean }[]>> = {

    gym: {

      push: [
        { name: 'Bench Press', main: true },
        { name: 'Incline Dumbbell Press', main: true },
        { name: 'Shoulder Press', main: true },
        { name: 'Lateral Raise', main: false },
        { name: 'Triceps Pushdown', main: false }
      ],

      pull: [
        { name: 'Lat Pulldown', main: true },
        { name: 'Seated Cable Row', main: true },
        { name: 'Assisted Pull-Up', main: true },
        { name: 'Face Pull', main: false },
        { name: 'Biceps Curl', main: false }
      ],

      legs: [
        { name: 'Back Squat', main: true },
        { name: 'Romanian Deadlift', main: true },
        { name: 'Leg Press', main: true },
        { name: 'Leg Curl', main: false },
        { name: 'Calf Raise', main: false }
      ],

      core: [
        { name: 'Cable Crunch', main: false },
        { name: 'Plank', main: false }
      ]
    },


    home: {

      push: [
        { name: 'Dumbbell Floor Press', main: true },
        { name: 'Dumbbell Shoulder Press', main: true },
        { name: 'Push-Up', main: true },
        { name: 'Dumbbell Lateral Raise', main: false },
        { name: 'Dumbbell Triceps Extension', main: false }
      ],

      pull: [
        { name: 'One-Arm Dumbbell Row', main: true },
        { name: 'Band Row', main: true },
        { name: 'Dumbbell Reverse Fly', main: false },
        { name: 'Band Face Pull', main: false },
        { name: 'Dumbbell Curl', main: false }
      ],

      legs: [
        { name: 'Goblet Squat', main: true },
        { name: 'Dumbbell Romanian Deadlift', main: true },
        { name: 'Bulgarian Split Squat', main: true },
        { name: 'Glute Bridge', main: false },
        { name: 'Calf Raise', main: false }
      ],

      core: [
        { name: 'Plank', main: false },
        { name: 'Dead Bug', main: false }
      ]
    },


    bodyweight: {

      push: [
        { name: 'Push-Up', main: true },
        { name: 'Pike Push-Up', main: true },
        { name: 'Diamond Push-Up', main: false },
        { name: 'Bench Dip', main: false },
        { name: 'Plank Shoulder Tap', main: false }
      ],

      pull: [
        { name: 'Reverse Snow Angel', main: true },
        { name: 'Prone W Raise', main: true },
        { name: 'Superman Pull', main: false },
        { name: 'Scapular Retraction', main: false },
        { name: 'Prone Y Raise', main: false }
      ],

      legs: [
        { name: 'Bodyweight Squat', main: true },
        { name: 'Reverse Lunge', main: true },
        { name: 'Bulgarian Split Squat', main: true },
        { name: 'Single-Leg Glute Bridge', main: false },
        { name: 'Calf Raise', main: false }
      ],

      core: [
        { name: 'Plank', main: false },
        { name: 'Dead Bug', main: false }
      ]
    }
  };


  // Selecciona un AI Coach
  selectCoach(coach: string) {
    this.selectedCoach = coach;
    this.planGenerated = false;
    this.formMessage = '';
  }


  // Genera el plan
  generatePlan() {

    if (
      !this.selectedCoach ||
      !this.experience ||
      !this.trainingDays ||
      !this.duration ||
      !this.equipment
    ) {
      this.formMessage = 'Please complete all fields.';
      this.planGenerated = false;
      return;
    }

    if (this.trainingDays < 1 || this.trainingDays > 5) {
      this.formMessage = 'Choose between 1 and 5 training days.';
      this.planGenerated = false;
      return;
    }

    // Crea la rutina
    this.trainingPlan = this.buildPlan();

    this.formMessage = 'Your training plan is ready.';
    this.planGenerated = true;
  }


  // Construye la rutina semanal
  buildPlan() {

    const days = this.getDayNames(this.trainingDays!);

    const exerciseLimit = this.getExerciseLimit();

    return days.map((dayName, dayIndex) => {

      // Decide qué grupos entrenar
      const categories =
        this.getCategories(dayName).slice(0, exerciseLimit);

      const categoryCounter: Record<string, number> = {};

      const exercises = categories.map((category) => {

        // Cuenta ejercicios del mismo grupo
        categoryCounter[category] =
          (categoryCounter[category] || 0) + 1;

        const exercisePool =
          this.exerciseLibrary[this.equipment][category];

        // Cambia ejercicios entre días
        const exerciseIndex =
          (dayIndex + categoryCounter[category] - 1)
          % exercisePool.length;

        const exercise = exercisePool[exerciseIndex];

        return {
          name: exercise.name,
          sets: this.getSets(exercise.main),
          reps: this.getReps(exercise.main),
          rest: this.getRest(exercise.main),
          instructions: this.getInstructions(exercise.name)
        };
      });

      return {
        name: dayName,
        exercises: exercises
      };
    });
  }


  // Decide los días de entrenamiento
  getDayNames(days: number) {

    if (days === 1) {
      return [
        'WEDNESDAY — FULL BODY'
      ];
    }

    if (days === 2) {
      return [
        'MONDAY — FULL BODY A',
        'THURSDAY — FULL BODY B'
      ];
    }

    if (days === 3) {
      return [
        'MONDAY — FULL BODY A',
        'WEDNESDAY — FULL BODY B',
        'FRIDAY — FULL BODY C'
      ];
    }

    if (days === 4) {
      return [
        'MONDAY — UPPER A',
        'TUESDAY — LOWER A',
        'THURSDAY — UPPER B',
        'FRIDAY — LOWER B'
      ];
    }

    return [
      'MONDAY — PUSH',
      'TUESDAY — PULL',
      'WEDNESDAY — LEGS',
      'FRIDAY — UPPER',
      'SATURDAY — LOWER'
    ];
  }


  // Decide los grupos de cada día
  getCategories(dayName: string) {

    if (dayName.includes('PUSH')) {
      return ['push', 'push', 'push', 'push', 'push', 'core'];
    }

    if (dayName.includes('PULL')) {
      return ['pull', 'pull', 'pull', 'pull', 'pull', 'core'];
    }

    if (dayName.includes('LEGS')) {
      return ['legs', 'legs', 'legs', 'legs', 'legs', 'core'];
    }

    if (dayName.includes('UPPER')) {
      return ['push', 'pull', 'push', 'pull', 'push', 'pull', 'core'];
    }

    if (dayName.includes('LOWER')) {
      return ['legs', 'legs', 'legs', 'legs', 'core', 'legs', 'core'];
    }

    // Full Body
    return ['legs', 'push', 'pull', 'legs', 'push', 'pull', 'core'];
  }


  // Ajusta ejercicios según duración
  getExerciseLimit() {

    if (this.duration === '30') {
      return 4;
    }

    if (this.duration === '45') {
      return 5;
    }

    if (this.duration === '60') {
      return 6;
    }

    return 7;
  }


  // Ajusta las series según experiencia
  getSets(mainExercise: boolean) {

    if (this.experience === 'beginner') {
      return mainExercise ? 3 : 2;
    }

    if (this.experience === 'advanced') {
      return mainExercise ? 4 : 3;
    }

    return 3;
  }


  // Ajusta repeticiones según coach
  getReps(mainExercise: boolean) {

    if (this.selectedCoach === 'Ares') {
      return mainExercise ? '4-6' : '6-10';
    }

    if (this.selectedCoach === 'Hercules') {
      return mainExercise ? '6-10' : '10-15';
    }

    return mainExercise ? '6-8' : '10-15';
  }


  // Ajusta descansos según coach
  getRest(mainExercise: boolean) {

    if (this.selectedCoach === 'Ares') {
      return mainExercise ? '2-3 min' : '60-90 sec';
    }

    if (this.selectedCoach === 'Hercules') {
      return mainExercise ? '90-120 sec' : '60-90 sec';
    }

    return mainExercise ? '90 sec' : '45-75 sec';
  }


  // Devuelve la explicación del ejercicio
  getInstructions(exerciseName: string) {

    const instructions: Record<string, string> = {

      'Bench Press':
        'Lie on the bench, keep your feet stable and lower the bar toward your chest before pressing it upward.',

      'Incline Dumbbell Press':
        'Set the bench at an incline, lower the dumbbells with control and press them upward.',

      'Shoulder Press':
        'Keep your torso stable and press the weight overhead without excessively arching your back.',

      'Lateral Raise':
        'Raise your arms to the sides with a slight elbow bend until they reach shoulder height.',

      'Triceps Pushdown':
        'Keep your elbows close to your body and extend your arms downward without moving your shoulders.',

      'Lat Pulldown':
        'Keep your chest up and pull the bar toward your upper chest while driving your elbows downward.',

      'Seated Cable Row':
        'Sit upright and pull the handle toward your torso while keeping your back stable.',

      'Assisted Pull-Up':
        'Use the assistance platform and pull your body upward until your chin approaches the bar.',

      'Face Pull':
        'Pull the rope toward your face while keeping your elbows high and squeezing your upper back.',

      'Biceps Curl':
        'Keep your elbows close to your body and curl the weight without swinging your torso.',

      'Back Squat':
        'Keep your feet stable, brace your torso and lower with control before standing back up.',

      'Romanian Deadlift':
        'Push your hips backward while keeping your back neutral and lower the weight along your legs.',

      'Leg Press':
        'Place your feet firmly on the platform, lower it with control and push through your feet.',

      'Leg Curl':
        'Keep your hips stable and bend your knees to bring the pad toward your legs.',

      'Calf Raise':
        'Raise your heels as high as possible, pause briefly and lower them with control.',

      'Cable Crunch':
        'Keep your hips stable and flex your torso by bringing your ribs toward your pelvis.',

      'Plank':
        'Keep your body in a straight line and brace your abdomen without letting your hips drop.',

      'Dumbbell Floor Press':
        'Lie on the floor, lower the dumbbells until your arms touch the ground and press upward.',

      'Dumbbell Shoulder Press':
        'Keep your torso stable and press both dumbbells overhead with controlled movement.',

      'Push-Up':
        'Keep your body straight, lower your chest toward the floor and push yourself back up.',

      'Dumbbell Lateral Raise':
        'Raise the dumbbells to the sides with control until your arms reach shoulder height.',

      'Dumbbell Triceps Extension':
        'Keep your upper arms stable and extend your elbows to move the dumbbell upward.',

      'One-Arm Dumbbell Row':
        'Support your body with one arm and pull the dumbbell toward your hip.',

      'Band Row':
        'Keep tension on the band and pull your hands toward your torso while squeezing your back.',

      'Dumbbell Reverse Fly':
        'Lean forward slightly and open your arms to the sides while keeping a small elbow bend.',

      'Band Face Pull':
        'Pull the band toward your face while keeping your elbows high.',

      'Dumbbell Curl':
        'Keep your elbows still and curl the dumbbells toward your shoulders.',

      'Goblet Squat':
        'Hold the weight close to your chest, squat down with control and push through your feet.',

      'Dumbbell Romanian Deadlift':
        'Push your hips backward and lower the dumbbells close to your legs while keeping your back neutral.',

      'Bulgarian Split Squat':
        'Place one foot behind you on a raised surface and lower your body using the front leg.',

      'Glute Bridge':
        'Drive your hips upward by squeezing your glutes while keeping your upper back on the floor.',

      'Dead Bug':
        'Keep your lower back stable while slowly extending the opposite arm and leg.',

      'Pike Push-Up':
        'Keep your hips high and lower your head toward the floor before pressing yourself upward.',

      'Diamond Push-Up':
        'Place your hands close together and perform a push-up while keeping your elbows controlled.',

      'Bench Dip':
        'Support your hands on a stable bench and bend your elbows to lower your body with control.',

      'Plank Shoulder Tap':
        'Hold a stable plank and alternate touching each shoulder without rotating your hips.',

      'Reverse Snow Angel':
        'Lie face down and move your arms slowly from your sides toward overhead while squeezing your back.',

      'Prone W Raise':
        'Lie face down and lift your arms into a W shape while squeezing your shoulder blades.',

      'Superman Pull':
        'Lie face down, lift your chest slightly and pull your elbows toward your body.',

      'Scapular Retraction':
        'Keep your arms controlled and squeeze your shoulder blades together without shrugging.',

      'Prone Y Raise':
        'Lie face down and raise your arms diagonally into a Y shape while keeping the movement controlled.',

      'Bodyweight Squat':
        'Keep your feet stable, sit your hips down and back, then stand by pushing through your feet.',

      'Reverse Lunge':
        'Step one leg backward, lower both knees with control and return to the starting position.',

      'Single-Leg Glute Bridge':
        'Keep one leg raised and drive your hips upward using the glute of the supporting leg.'
    };

    return instructions[exerciseName] ||
      'Perform the exercise with controlled technique and a comfortable range of motion.';
  }
}