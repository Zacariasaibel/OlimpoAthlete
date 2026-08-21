// Herramientas de Angular
import { Component, Output, EventEmitter } from '@angular/core';

// Permite usar [(ngModel)]
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})

export class Auth {

  // Datos del registro
  name = '';
  email = '';
  password = '';

  // Mensaje del registro
  registerMessage = '';

  // Datos del login
  loginEmail = '';
  loginPassword = '';

  // Mensaje del login
  loginMessage = '';

  // Avisa a App cuando el acceso es correcto
  @Output() authSuccess = new EventEmitter<void>();


  // Crea una cuenta
  register() {

    if (this.name && this.email && this.password) {

      // Guarda los datos del usuario
      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      // Guarda el usuario en localStorage
      localStorage.setItem(
        'olimpoUser',
        JSON.stringify(user)
      );

      this.registerMessage = 'Account created successfully.';

      // Espera antes de cambiar de pantalla
      setTimeout(() => {
        this.authSuccess.emit();
      }, 1200);

    } else {

      this.registerMessage = 'Please complete all fields.';
    }
  }


  // Inicia sesión
  login() {

    // Recupera el usuario guardado
    const savedUser = localStorage.getItem('olimpoUser');

    if (!savedUser) {

      this.loginMessage = 'Account not found.';
      return;
    }

    // Convierte el texto en objeto
    const user = JSON.parse(savedUser);

    // Comprueba el email
    if (this.loginEmail !== user.email) {

      this.loginMessage = 'Account not found.';
      return;
    }

    // Comprueba la contraseña
    if (this.loginPassword !== user.password) {

      this.loginMessage = 'Incorrect password.';
      return;
    }

    // Login correcto
    this.loginMessage = 'Access successful.';

    // Espera antes de cambiar de pantalla
    setTimeout(() => {
      this.authSuccess.emit();
    }, 1200);
  }
}