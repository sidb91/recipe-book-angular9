import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthResponseData } from './authResponseDataInterface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUpForm(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDY_PPGpf1pZRhEtGgFS5eZBFvNN2W6KoQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  loginForm(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDY_PPGpf1pZRhEtGgFS5eZBFvNN2W6KoQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMsg = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMsg =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMsg =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMsg = 'The user account has been disabled by an administrator.';
        break;
    }

    return throwError(errorMsg);
  }
}
