import { Component } from '@angular/core';
import { UsersModel } from './models/UsersModel';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  isLoginMode = true;
  isSubmitting = false;
  submitted = false;
  successMessage = '';
  showDashboard = false;

  // NEW: store current role
  currentRole: string = '';

  authForm!: FormGroup;

  // Example Users
  users: UsersModel[] = [
    {
      email: "admin@gmail.com",
      password: "123456",
      role: "admin"
    },
    {
      email: "student@gmail.com",
      password: "123456",
      role: "student"
    }
  ];

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Shortcut for form controls
  get f() {
    return this.authForm.controls;
  }

  toggleMode() {

    this.isLoginMode = !this.isLoginMode;
    this.submitted = false;
    this.successMessage = '';

    if (this.isLoginMode) {
      this.f['username'].clearValidators();
    } else {
      this.f['username'].setValidators([Validators.required]);
    }

    this.f['username'].updateValueAndValidity();

  }

  onSubmit() {

    this.submitted = true;
    this.successMessage = '';

    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;

    if (this.isLoginMode) {

      // LOGIN CHECK
      const user = this.users.find(
        u => u.email === email && u.password === password
      );

      if (user) {

        this.successMessage = 'Login successful!';
        this.currentRole = user.role;   // role detection
        this.showDashboard = true;

      } else {

        this.successMessage = 'Invalid email or password';

      }

    } else {

      // REGISTER MODE
      this.users.push({
        email: email,
        password: password,
        role: 'student'
      });

      this.successMessage = 'Account created successfully!';

    }

    this.authForm.reset();
    this.submitted = false;

  }

  logout(){

    this.showDashboard = false;
    this.successMessage = '';
    this.isLoginMode = true;
    this.currentRole = '';

  }

}