import { Component } from '@angular/core';

@Component({
  selector: 'app-trainers',
  imports: [],
  templateUrl: './trainers.html',
  styleUrl: './trainers.css',
})

export class Trainers {

  trainers = [
    {
      name: 'Ares',
      specialty: 'Strength AI Coach'
    },
    {
      name: 'Hercules',
      specialty: 'Hypertrophy AI Coach'
    },
    {
      name: 'Athena',
      specialty: 'Performance AI Coach'
    }
  ];
}