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

  name = '';
  email = '';
  password = '';

  registerMessage = '';

  loginEmail = '';
  loginPassword = '';

  loginMessage = '';

  // Avisa a App cuando el acceso es correcto
  @Output() authSuccess = new EventEmitter<void>();


  register() {

    if (this.name && this.email && this.password) {

      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      // Demo frontend: guarda el usuario en el navegador
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


  login() {

    // Recupera el usuario guardado
    const savedUser = localStorage.getItem('olimpoUser');

    if (!savedUser) {
      this.loginMessage = 'Account not found.';
      return;
    }

    // Convierte el texto guardado en objeto
    const user = JSON.parse(savedUser);

    if (this.loginEmail !== user.email) {
      this.loginMessage = 'Account not found.';
      return;
    }

    if (this.loginPassword !== user.password) {
      this.loginMessage = 'Incorrect password.';
      return;
    }

    this.loginMessage = 'Access successful.';

    setTimeout(() => {
      this.authSuccess.emit();
    }, 1200);
  }
}