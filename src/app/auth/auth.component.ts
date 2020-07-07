import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from './authResponseDataInterface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoadingSpinner = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      //extra validation if user enables button
      return;
    }
    const email: String = form.value.email;
    const password: String = form.value.password;

    let authObsrvl: Observable<AuthResponseData>; //An observable variable

    this.isLoadingSpinner = true; //while sending login or sign up requests to backend
    if (this.isLoginMode) {
      authObsrvl = this.authService.loginForm(email, password);
    } else {
      authObsrvl = this.authService.signUpForm(email, password);
    }

    authObsrvl.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoadingSpinner = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoadingSpinner = false;
      }
    );

    form.reset();

  }
}
