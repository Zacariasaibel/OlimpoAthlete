// Herramientas de Angular
import { Component, Output, EventEmitter } from '@angular/core';

// Permite usar [(ngModel)] en formularios
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})

export class Auth {

  // Datos para crear una cuenta
  name = '';
  email = '';
  password = '';

  // Mensaje del registro
  registerMessage = '';

  // Datos para iniciar sesión
  loginEmail = '';
  loginPassword = '';

  // Mensaje del login
  loginMessage = '';

  // Avisa a App cuando el usuario entra correctamente
  @Output() authSuccess = new EventEmitter<void>();


  // Crear una cuenta
  register() {

    if (this.name && this.email && this.password) {

      // Objeto con los datos del usuario
      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      // Guarda el usuario en el navegador
      localStorage.setItem(
        'olimpoUser',
        JSON.stringify(user)
      );

      this.registerMessage = 'Account created successfully.';

      // Avisa a App
      this.authSuccess.emit();

    } else {

      this.registerMessage = 'Please complete all fields.';
    }
  }


  // Iniciar sesión
  login() {

    // Recupera el usuario guardado
    const savedUser = localStorage.getItem('olimpoUser');

    if (savedUser) {

      // Convierte el texto guardado otra vez en objeto
      const user = JSON.parse(savedUser);

      // Comprueba email y contraseña
      if (
        this.loginEmail === user.email &&
        this.loginPassword === user.password
      ) {

        this.loginMessage = `Welcome, ${user.name}!`;

        // Avisa a App
        this.authSuccess.emit();

      } else {

        this.loginMessage = 'Incorrect email or password.';
      }

    } else {

      this.loginMessage = 'No account found.';
    }
  }
}