import { Component, output } from '@angular/core';
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
  readonly authSuccess = output<void>();

  register() {
    if (!this.name.trim() || !this.email.trim() || !this.password) {
      this.registerMessage = 'Please complete all fields.';
      return;
    }
    try {
      localStorage.setItem('olimpoUser', JSON.stringify({
        name: this.name.trim(), email: this.email.trim(), password: this.password,
      }));
    } catch {
      this.registerMessage = 'Browser storage is unavailable. Please allow local storage to use this demo.';
      return;
    }
    this.authSuccess.emit();
  }

  login() {
    let user: unknown;
    try {
      const savedUser = localStorage.getItem('olimpoUser');
      if (!savedUser) { this.loginMessage = 'Account not found.'; return; }
      user = JSON.parse(savedUser);
    } catch {
      this.loginMessage = 'Demo account could not be read. Please register again.';
      return;
    }
    if (!user || typeof user !== 'object' || !('email' in user) ||
        !('password' in user) || typeof user.email !== 'string' || typeof user.password !== 'string') {
      this.loginMessage = 'Demo account could not be read. Please register again.';
      return;
    }
    if (this.loginEmail.trim() !== user.email) {
      this.loginMessage = 'Account not found.';
      return;
    }
    if (this.loginPassword !== user.password) {
      this.loginMessage = 'Incorrect password.';
      return;
    }
    this.authSuccess.emit();
  }
}
