import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  // Login fields
  email: string = '';
  password: string = '';

  // Register fields
  regEmail: string = '';
  regPassword: string = '';

  // View controls
  isLoginView: boolean = true;
  isSuccess: boolean = false;

  login() {
    if (this.email && this.password) {
      this.isSuccess = true;
    } else {
      alert('Please enter email and password');
    }
  }

  register() {
    if (this.regEmail && this.regPassword) {
      alert('Registration successful! Please login.');
      this.isLoginView = true;
    } else {
      alert('Please fill all fields');
    }
  }

  goToRegister() {
    this.isLoginView = false;
    this.isSuccess = false;
  }

  goToLogin() {
    this.isLoginView = true;
    this.isSuccess = false;
  }
}